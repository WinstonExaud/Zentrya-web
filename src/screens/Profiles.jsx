import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Plus, Lock, X, Loader, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';

const Profiles = () => {
  const navigate = useNavigate();
  const { setCurrentProfile, user } = useAuth();
  
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [verifyingPin, setVerifyingPin] = useState(false);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getUserProfiles();
      setProfiles(data);
    } catch (err) {
      console.error('Failed to load profiles:', err);
      setError('Failed to load profiles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileClick = async (profile) => {
    if (profile.pin_enabled) {
      setSelectedProfile(profile);
      setShowPinModal(true);
      setPin('');
      setPinError('');
    } else {
      await selectProfile(profile);
    }
  };

  const selectProfile = async (profile) => {
    try {
      await apiService.setActiveProfile(profile.id);
      await setCurrentProfile(profile);
      navigate('/home');
    } catch (err) {
      console.error('Failed to select profile:', err);
      setError('Failed to select profile. Please try again.');
    }
  };

  const handlePinSubmit = async () => {
    if (pin.length !== 4) {
      setPinError('PIN must be 4 digits');
      return;
    }

    try {
      setVerifyingPin(true);
      setPinError('');
      
      const response = await apiService.verifyProfilePin(selectedProfile.id, pin);
      
      if (response.verified) {
        await selectProfile(selectedProfile);
        setShowPinModal(false);
      } else {
        setPinError('Incorrect PIN. Please try again.');
        setPin('');
      }
    } catch (err) {
      console.error('PIN verification failed:', err);
      setPinError('Incorrect PIN. Please try again.');
      setPin('');
    } finally {
      setVerifyingPin(false);
    }
  };

  const handleAddProfile = () => {
    navigate('/profiles/create');
  };

  const handleManageProfiles = () => {
    navigate('/profiles/manage');
  };

  const handlePinModalClose = () => {
    setShowPinModal(false);
    setSelectedProfile(null);
    setPin('');
    setPinError('');
  };

  const handlePinChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setPin(value);
    setPinError('');
  };

  const handlePinKeyPress = (e) => {
    if (e.key === 'Enter' && pin.length === 4) {
      handlePinSubmit();
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <Loader style={{ 
            width: '48px', 
            height: '48px', 
            color: '#D4A017',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }} />
          <p style={{ color: '#9CA3AF', fontSize: '18px' }}>Loading profiles...</p>
        </div>
      </div>
    );
  }

  if (error && profiles.length === 0) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '448px' }}>
          <AlertCircle style={{ 
            width: '64px', 
            height: '64px', 
            color: '#EF4444',
            margin: '0 auto 16px'
          }} />
          <p style={{ color: '#D1D5DB', fontSize: '18px', marginBottom: '24px' }}>{error}</p>
          <button 
            onClick={loadProfiles}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(to right, #D4A017, #f0c419)',
              color: '#000',
              fontWeight: '600',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'linear-gradient(to right, #f0c419, #D4A017)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'linear-gradient(to right, #D4A017, #f0c419)';
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)'
    }}>
      {/* Header */}
      <header style={{
        padding: '24px 32px',
        borderBottom: '1px solid #374151'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ 
            fontSize: '28px', 
            fontWeight: '900', 
            letterSpacing: '2px' 
          }}>
            <span style={{ color: '#D4A017' }}>ZEN</span>
            <span style={{ color: '#fff' }}>TRYA</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '48px 16px'
      }}>
        
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#fff',
            marginBottom: '12px'
          }}>
            Who's Watching?
          </h1>
          <p style={{ color: '#9CA3AF', fontSize: '18px' }}>
            Select a profile to continue
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div style={{ marginBottom: '32px', maxWidth: '672px', margin: '0 auto 32px' }}>
            <div style={{
              background: 'rgba(127, 29, 29, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.5)',
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}>
              <AlertCircle style={{ width: '20px', height: '20px', color: '#EF4444', flexShrink: 0 }} />
              <p style={{ color: '#FCA5A5', fontSize: '14px', flex: 1 }}>{error}</p>
              <button 
                onClick={() => setError(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#F87171',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                <X style={{ width: '20px', height: '20px' }} />
              </button>
            </div>
          </div>
        )}

        {/* Profile Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '24px',
          maxWidth: '1000px',
          margin: '0 auto 48px'
        }}>
          {profiles.map((profile) => (
            <div
              key={profile.id}
              onClick={() => handleProfileClick(profile)}
              style={{
                cursor: 'pointer',
                transition: 'transform 0.3s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {/* Avatar Container */}
              <div style={{ position: 'relative', marginBottom: '12px' }}>
                <div style={{
                  position: 'relative',
                  aspectRatio: '1',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '4px solid transparent',
                  transition: 'border-color 0.3s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#D4A017';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'transparent';
                }}
                >
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />

                  {/* Kids Badge */}
                  {profile.isKids && (
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      background: '#3B82F6',
                      color: '#fff',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      padding: '4px 8px',
                      borderRadius: '9999px'
                    }}>
                      KIDS
                    </div>
                  )}

                  {/* Lock Badge */}
                  {profile.pin_enabled && (
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      background: 'rgba(17, 24, 39, 0.9)',
                      backdropFilter: 'blur(8px)',
                      padding: '8px',
                      borderRadius: '9999px',
                      border: '1px solid #374151'
                    }}>
                      <Lock style={{ width: '16px', height: '16px', color: '#D4A017' }} />
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Name */}
              <p style={{
                textAlign: 'center',
                color: '#D1D5DB',
                fontWeight: '500',
                transition: 'color 0.3s'
              }}
              onMouseOver={(e) => {
                e.target.style.color = '#fff';
              }}
              onMouseOut={(e) => {
                e.target.style.color = '#D1D5DB';
              }}
              >
                {profile.name}
              </p>
            </div>
          ))}

          {/* Add Profile Card */}
          {profiles.length < 5 && (
            <div
              onClick={handleAddProfile}
              style={{
                cursor: 'pointer',
                transition: 'transform 0.3s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <div style={{ position: 'relative', marginBottom: '12px' }}>
                <div style={{
                  aspectRatio: '1',
                  borderRadius: '12px',
                  border: '4px dashed #374151',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(17, 24, 39, 0.5)',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#D4A017';
                  e.currentTarget.style.background = 'rgba(17, 24, 39, 1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = '#374151';
                  e.currentTarget.style.background = 'rgba(17, 24, 39, 0.5)';
                }}
                >
                  <Plus style={{ 
                    width: '64px', 
                    height: '64px', 
                    color: '#4B5563',
                    transition: 'color 0.3s'
                  }} />
                </div>
              </div>

              <p style={{
                textAlign: 'center',
                color: '#9CA3AF',
                fontWeight: '500',
                transition: 'color 0.3s'
              }}
              onMouseOver={(e) => {
                e.target.style.color = '#fff';
              }}
              onMouseOut={(e) => {
                e.target.style.color = '#9CA3AF';
              }}
              >
                Add Profile
              </p>
            </div>
          )}
        </div>

        {/* Manage Profiles Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleManageProfiles}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              border: '2px solid #374151',
              color: '#D1D5DB',
              background: 'transparent',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '16px',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.target.style.borderColor = '#D4A017';
              e.target.style.color = '#fff';
            }}
            onMouseOut={(e) => {
              e.target.style.borderColor = '#374151';
              e.target.style.color = '#D1D5DB';
            }}
          >
            <Edit style={{ width: '20px', height: '20px' }} />
            <span>Manage Profiles</span>
          </button>
        </div>
      </div>

      {/* PIN Modal */}
      {showPinModal && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            padding: '16px'
          }}
          onClick={handlePinModalClose}
        >
          <div 
            style={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
              borderRadius: '16px',
              border: '2px solid rgba(212, 160, 23, 0.3)',
              maxWidth: '448px',
              width: '100%',
              padding: '32px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handlePinModalClose}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                color: '#9CA3AF',
                cursor: 'pointer',
                padding: 0
              }}
            >
              <X style={{ width: '24px', height: '24px' }} />
            </button>

            {/* Profile Info */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              {/* Avatar */}
              <div style={{
                width: '96px',
                height: '96px',
                margin: '0 auto 16px',
                borderRadius: '9999px',
                overflow: 'hidden',
                border: '4px solid rgba(212, 160, 23, 0.5)'
              }}>
                <img
                  src={selectedProfile?.avatar}
                  alt={selectedProfile?.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>

              {/* Lock Icon */}
              <div style={{
                width: '48px',
                height: '48px',
                margin: '0 auto 16px',
                background: 'rgba(212, 160, 23, 0.2)',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Lock style={{ width: '24px', height: '24px', color: '#D4A017' }} />
              </div>

              {/* Title */}
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#fff',
                marginBottom: '8px'
              }}>
                Profile Lock
              </h2>
              <p style={{ color: '#9CA3AF' }}>
                Enter PIN for <span style={{ color: '#D4A017', fontWeight: '600' }}>{selectedProfile?.name}</span>
              </p>
            </div>

            {/* PIN Input */}
            <div style={{ marginBottom: '24px' }}>
              <input
                type="password"
                inputMode="numeric"
                maxLength="4"
                value={pin}
                onChange={handlePinChange}
                onKeyPress={handlePinKeyPress}
                placeholder="••••"
                style={{
                  width: '100%',
                  padding: '16px 24px',
                  background: 'rgba(0, 0, 0, 0.5)',
                  border: `2px solid ${pinError ? '#EF4444' : '#374151'}`,
                  borderRadius: '12px',
                  textAlign: 'center',
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#fff',
                  letterSpacing: '0.25em',
                  outline: 'none',
                  transition: 'border-color 0.3s'
                }}
                autoFocus
                disabled={verifyingPin}
                onFocus={(e) => {
                  if (!pinError) e.target.style.borderColor = '#D4A017';
                }}
                onBlur={(e) => {
                  if (!pinError) e.target.style.borderColor = '#374151';
                }}
              />
              
              {/* PIN Dots */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '12px',
                marginTop: '16px'
              }}>
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '9999px',
                      background: i < pin.length ? '#D4A017' : '#374151',
                      transform: i < pin.length ? 'scale(1.25)' : 'scale(1)',
                      transition: 'all 0.2s'
                    }}
                  />
                ))}
              </div>

              {/* Error */}
              {pinError && (
                <div style={{
                  marginTop: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#F87171',
                  fontSize: '14px',
                  background: 'rgba(127, 29, 29, 0.2)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '8px',
                  padding: '12px'
                }}>
                  <AlertCircle style={{ width: '16px', height: '16px', flexShrink: 0 }} />
                  <p>{pinError}</p>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={handlePinSubmit}
                disabled={pin.length !== 4 || verifyingPin}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: pin.length === 4 && !verifyingPin 
                    ? 'linear-gradient(to right, #D4A017, #f0c419)' 
                    : '#4B5563',
                  color: '#000',
                  fontWeight: 'bold',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: pin.length === 4 && !verifyingPin ? 'pointer' : 'not-allowed',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.3s'
                }}
              >
                {verifyingPin ? (
                  <>
                    <Loader style={{ width: '20px', height: '20px', animation: 'spin 1s linear infinite' }} />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle style={{ width: '20px', height: '20px' }} />
                    <span>Enter</span>
                  </>
                )}
              </button>

              <button
                onClick={handlePinModalClose}
                disabled={verifyingPin}
                style={{
                  width: '100%',
                  padding: '16px',
                  border: '2px solid #374151',
                  background: 'transparent',
                  color: '#D1D5DB',
                  fontWeight: '600',
                  borderRadius: '12px',
                  cursor: verifyingPin ? 'not-allowed' : 'pointer',
                  fontSize: '16px',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => {
                  if (!verifyingPin) {
                    e.target.style.borderColor = '#4B5563';
                    e.target.style.color = '#fff';
                  }
                }}
                onMouseOut={(e) => {
                  if (!verifyingPin) {
                    e.target.style.borderColor = '#374151';
                    e.target.style.color = '#D1D5DB';
                  }
                }}
              >
                Cancel
              </button>
            </div>

            <p style={{
              textAlign: 'center',
              color: '#6B7280',
              fontSize: '14px',
              marginTop: '24px'
            }}>
              Forgot your PIN? Contact account owner.
            </p>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #D4A017;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #f0c419;
        }
      `}} />
    </div>
  );
};

export default Profiles;