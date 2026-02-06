import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';
import { 
  Edit2, 
  Trash2, 
  Plus, 
  X, 
  Lock, 
  Eye, 
  EyeOff,
  Loader,
  Check,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';

const ManageProfiles = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    avatar: '',
    isKids: false,
    pin: '',
    pinEnabled: false
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [showPin, setShowPin] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [avatars, setAvatars] = useState([]);
  const [loadingAvatars, setLoadingAvatars] = useState(false);

  useEffect(() => {
    fetchProfiles();
    fetchAvatars();
  }, []);

  const fetchAvatars = async () => {
    try {
      setLoadingAvatars(true);
      const data = await apiService.getPublicAvatars('default', 0, 50);
      setAvatars(data.avatars || []);
    } catch (err) {
      console.error('Error fetching avatars:', err);
      setAvatars([
        { id: 1, avatar_url: 'https://i.pravatar.cc/150?img=1' },
        { id: 2, avatar_url: 'https://i.pravatar.cc/150?img=2' },
        { id: 3, avatar_url: 'https://i.pravatar.cc/150?img=3' },
        { id: 4, avatar_url: 'https://i.pravatar.cc/150?img=4' },
      ]);
    } finally {
      setLoadingAvatars(false);
    }
  };

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const data = await apiService.getUserProfiles();
      setProfiles(data);
      setError('');
    } catch (err) {
      console.error('Error fetching profiles:', err);
      setError('Failed to load profiles');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (profile) => {
    setSelectedProfile(profile);
    setFormData({
      name: profile.name,
      avatar: profile.avatar,
      isKids: profile.isKids,
      pin: '',
      pinEnabled: profile.pin_enabled || false
    });
    setFormErrors({});
    setShowEditModal(true);
  };

  const handleDeleteClick = (profile) => {
    setSelectedProfile(profile);
    setShowDeleteModal(true);
  };

  const handleAddClick = () => {
    setFormData({
      name: '',
      avatar: avatars[0]?.avatar_url || '',
      isKids: false,
      pin: '',
      pinEnabled: false
    });
    setFormErrors({});
    setShowAddModal(true);
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Profile name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    } else if (formData.name.trim().length > 20) {
      errors.name = 'Name must be less than 20 characters';
    }
    
    if (!formData.avatar) {
      errors.avatar = 'Please select an avatar';
    }
    
    if (formData.pinEnabled && !formData.pin) {
      errors.pin = 'PIN is required';
    } else if (formData.pin && formData.pin.length !== 4) {
      errors.pin = 'PIN must be 4 digits';
    } else if (formData.pin && !/^\d+$/.test(formData.pin)) {
      errors.pin = 'PIN must be numbers only';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    try {
      setActionLoading(true);
      setError('');
      
      await apiService.updateProfile(selectedProfile.id, {
        name: formData.name.trim(),
        avatar: formData.avatar,
        isKids: formData.isKids
      });
      
      if (formData.pinEnabled && formData.pin) {
        await apiService.setProfilePin(formData.pin);
      } else if (!formData.pinEnabled && selectedProfile.pin_enabled) {
        await apiService.removeProfilePin();
      }
      
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      await fetchProfiles();
      setShowEditModal(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message || 'Failed to update profile');
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    if (profiles.length >= 5) {
      setError('Maximum 5 profiles allowed');
      return;
    }
    
    try {
      setActionLoading(true);
      setError('');
      
      await apiService.createProfile({
        name: formData.name.trim(),
        avatar: formData.avatar,
        isKids: formData.isKids
      });
      
      setSuccessMessage('Profile created successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      await fetchProfiles();
      setShowAddModal(false);
    } catch (err) {
      console.error('Error creating profile:', err);
      setError(err.message || 'Failed to create profile');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      setActionLoading(true);
      setError('');
      
      await apiService.deleteProfile(selectedProfile.id);
      
      setSuccessMessage('Profile deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      await fetchProfiles();
      setShowDeleteModal(false);
    } catch (err) {
      console.error('Error deleting profile:', err);
      setError(err.message || 'Failed to delete profile');
    } finally {
      setActionLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <Loader style={styles.spinner} />
          <p style={styles.loadingText}>Loading profiles...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <button onClick={() => navigate('/profiles')} style={styles.backButton}>
          <ArrowLeft size={24} />
        </button>
        <div style={styles.logo}>
          <span style={styles.logoGold}>ZEN</span>
          <span style={styles.logoWhite}>TRYA</span>
        </div>
      </header>

      {/* Content */}
      <div style={styles.content}>
        <h1 style={styles.title}>Manage Profiles</h1>

        {/* Success Message */}
        {successMessage && (
          <div style={styles.successMessage}>
            <Check size={20} />
            <p>{successMessage}</p>
          </div>
        )}

        {/* Error Message */}
        {error && !showEditModal && !showDeleteModal && !showAddModal && (
          <div style={styles.errorMessage}>
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}

        {/* Profiles Grid */}
        <div style={styles.grid}>
          {profiles.map(profile => (
            <div
              key={profile.id}
              style={{
                ...styles.card,
                transform: hoveredCard === profile.id ? 'scale(1.05)' : 'scale(1)',
              }}
              onMouseEnter={() => setHoveredCard(profile.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={styles.avatarWrapper}>
                <img src={profile.avatar} alt={profile.name} style={styles.avatar} />
                {profile.pin_enabled && (
                  <div style={styles.lockBadge}>
                    <Lock size={16} />
                  </div>
                )}
                {profile.isKids && (
                  <div style={styles.kidsBadge}>KIDS</div>
                )}
              </div>

              <div style={styles.cardInfo}>
                <h3 style={styles.cardName}>{profile.name}</h3>
                <div style={styles.cardActions}>
                  <button onClick={() => handleEditClick(profile)} style={styles.editButton}>
                    <Edit2 size={18} />
                    <span>Edit</span>
                  </button>
                  {profiles.length > 1 && (
                    <button onClick={() => handleDeleteClick(profile)} style={styles.deleteButton}>
                      <Trash2 size={18} />
                      <span>Delete</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Add Profile Card */}
          {profiles.length < 5 && (
            <div
              style={{
                ...styles.card,
                ...styles.addCard,
                transform: hoveredCard === 'add' ? 'scale(1.05)' : 'scale(1)',
              }}
              onClick={handleAddClick}
              onMouseEnter={() => setHoveredCard('add')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={styles.addIcon}>
                <Plus size={64} />
              </div>
              <h3 style={styles.addText}>Add Profile</h3>
            </div>
          )}
        </div>

        {/* Done Button */}
        <div style={styles.doneContainer}>
          <button onClick={() => navigate('/profiles')} style={styles.doneButton}>
            Done
          </button>
        </div>
      </div>

      {/* Modals */}
      {(showEditModal || showAddModal) && (
        <ProfileModal
          isEdit={showEditModal}
          formData={formData}
          formErrors={formErrors}
          avatars={avatars}
          loadingAvatars={loadingAvatars}
          showPin={showPin}
          actionLoading={actionLoading}
          error={error}
          onClose={() => {
            setShowEditModal(false);
            setShowAddModal(false);
            setError('');
          }}
          onSubmit={showEditModal ? handleEditSubmit : handleAddSubmit}
          onInputChange={handleInputChange}
          onTogglePin={() => setShowPin(!showPin)}
          onSelectAvatar={(avatar) => setFormData(prev => ({ ...prev, avatar }))}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          profile={selectedProfile}
          actionLoading={actionLoading}
          error={error}
          onClose={() => {
            setShowDeleteModal(false);
            setError('');
          }}
          onConfirm={handleDeleteConfirm}
        />
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
};

// Profile Modal Component
const ProfileModal = ({ 
  isEdit, 
  formData, 
  formErrors, 
  avatars, 
  loadingAvatars,
  showPin, 
  actionLoading, 
  error,
  onClose, 
  onSubmit, 
  onInputChange, 
  onTogglePin,
  onSelectAvatar
}) => {
  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={styles.modalClose} disabled={actionLoading}>
          <X size={28} />
        </button>

        <h2 style={styles.modalTitle}>{isEdit ? 'Edit Profile' : 'Add Profile'}</h2>

        <form onSubmit={onSubmit} style={styles.form}>
          {error && (
            <div style={styles.formError}>
              <AlertCircle size={20} />
              <p>{error}</p>
            </div>
          )}

          <div style={styles.formSection}>
            <label style={styles.formLabel}>Choose Avatar</label>
            {loadingAvatars ? (
              <div style={styles.avatarLoading}>
                <Loader size={32} style={styles.spinner} />
              </div>
            ) : (
              <div style={styles.avatarGrid}>
                {avatars.map((avatar) => (
                  <div
                    key={avatar.id}
                    style={{
                      ...styles.avatarOption,
                      border: formData.avatar === avatar.avatar_url ? '3px solid #D4A017' : '3px solid transparent',
                    }}
                    onClick={() => !actionLoading && onSelectAvatar(avatar.avatar_url)}
                  >
                    <img src={avatar.avatar_url} alt="Avatar" style={styles.avatarOptionImage} />
                    {formData.avatar === avatar.avatar_url && (
                      <div style={styles.avatarCheck}>
                        <Check size={24} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {formErrors.avatar && <p style={styles.errorText}>{formErrors.avatar}</p>}
          </div>

          <div style={styles.formSection}>
            <label style={styles.formLabel}>Profile Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onInputChange}
              placeholder="Enter profile name"
              style={{
                ...styles.input,
                borderColor: formErrors.name ? '#EF4444' : '#374151',
              }}
              maxLength={20}
              disabled={actionLoading}
              onFocus={(e) => { if (!formErrors.name) e.target.style.borderColor = '#D4A017'; }}
              onBlur={(e) => { if (!formErrors.name) e.target.style.borderColor = '#374151'; }}
            />
            {formErrors.name ? (
              <p style={styles.errorText}>{formErrors.name}</p>
            ) : (
              <p style={styles.hintText}>{formData.name.length}/20 characters</p>
            )}
          </div>

          <div style={styles.formSection}>
            <label style={styles.switchLabel}>
              <input
                type="checkbox"
                name="isKids"
                checked={formData.isKids}
                onChange={onInputChange}
                style={styles.checkbox}
                disabled={actionLoading}
              />
              <div style={styles.switchContent}>
                <span style={styles.switchTitle}>Kids Profile</span>
                <span style={styles.switchDescription}>
                  Only show content suitable for children under 12
                </span>
              </div>
            </label>
          </div>

          {isEdit && (
            <div style={styles.formSection}>
              <label style={styles.switchLabel}>
                <input
                  type="checkbox"
                  name="pinEnabled"
                  checked={formData.pinEnabled}
                  onChange={onInputChange}
                  style={styles.checkbox}
                  disabled={actionLoading}
                />
                <div style={styles.switchContent}>
                  <span style={styles.switchTitle}>Require PIN</span>
                  <span style={styles.switchDescription}>
                    Protect this profile with a 4-digit PIN
                  </span>
                </div>
              </label>

              {formData.pinEnabled && (
                <div style={{ marginTop: '16px' }}>
                  <div style={styles.pinWrapper}>
                    <input
                      type={showPin ? 'text' : 'password'}
                      name="pin"
                      value={formData.pin}
                      onChange={onInputChange}
                      placeholder="Enter 4-digit PIN"
                      style={{
                        ...styles.input,
                        borderColor: formErrors.pin ? '#EF4444' : '#374151',
                      }}
                      maxLength={4}
                      disabled={actionLoading}
                    />
                    <button
                      type="button"
                      onClick={onTogglePin}
                      style={styles.pinToggle}
                      disabled={actionLoading}
                    >
                      {showPin ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {formErrors.pin && <p style={styles.errorText}>{formErrors.pin}</p>}
                </div>
              )}
            </div>
          )}

          <div style={styles.formButtons}>
            <button
              type="button"
              onClick={onClose}
              style={styles.cancelButton}
              disabled={actionLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={styles.submitButton}
              disabled={actionLoading}
            >
              {actionLoading ? (
                <>
                  <Loader size={20} style={styles.spinner} />
                  <span>Saving...</span>
                </>
              ) : (
                <span>{isEdit ? 'Save Changes' : 'Create Profile'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Delete Modal Component
const DeleteModal = ({ profile, actionLoading, error, onClose, onConfirm }) => {
  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={{ ...styles.modal, maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={styles.modalClose} disabled={actionLoading}>
          <X size={28} />
        </button>

        <h2 style={styles.modalTitle}>Delete Profile?</h2>

        {error && (
          <div style={styles.formError}>
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}

        <div style={styles.deleteContent}>
          <div style={styles.deleteAvatarWrapper}>
            <img src={profile?.avatar} alt={profile?.name} style={styles.deleteAvatar} />
            {profile?.isKids && <div style={styles.kidsBadge}>KIDS</div>}
          </div>

          <h3 style={styles.deleteName}>{profile?.name}</h3>
          <p style={styles.deleteWarning}>
            All viewing activity, preferences, and watch history for this profile will be permanently deleted.
          </p>
          <p style={styles.deleteWarningStrong}>This action cannot be undone.</p>
        </div>

        <div style={styles.formButtons}>
          <button onClick={onClose} style={styles.cancelButton} disabled={actionLoading}>
            Keep Profile
          </button>
          <button onClick={onConfirm} style={styles.deleteConfirmButton} disabled={actionLoading}>
            {actionLoading ? (
              <>
                <Loader size={20} style={styles.spinner} />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Delete Profile</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #000 0%, #0a0a0a 25%, #1a1a1a 50%, #0a0a0a 75%, #000 100%)',
    color: '#fff',
  },
  loadingContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    animation: 'spin 1s linear infinite',
    color: '#D4A017',
  },
  loadingText: {
    marginTop: '16px',
    color: '#9CA3AF',
    fontSize: '18px',
  },
  header: {
    padding: '24px 56px',
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  backButton: {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    transition: 'color 0.3s',
  },
  logo: {
    fontSize: '32px',
    fontWeight: '900',
    letterSpacing: '2px',
  },
  logoGold: {
    color: '#D4A017',
  },
  logoWhite: {
    color: '#fff',
  },
  content: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '60px 56px',
  },
  title: {
    fontSize: '48px',
    fontWeight: '900',
    marginBottom: '40px',
    textAlign: 'center',
    textShadow: '0 0 30px rgba(212, 160, 23, 0.3)',
  },
  successMessage: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 24px',
    background: 'rgba(34, 197, 94, 0.2)',
    border: '1px solid rgba(34, 197, 94, 0.5)',
    borderRadius: '12px',
    marginBottom: '24px',
    color: '#86EFAC',
  },
  errorMessage: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 24px',
    background: 'rgba(239, 68, 68, 0.2)',
    border: '1px solid rgba(239, 68, 68, 0.5)',
    borderRadius: '12px',
    marginBottom: '24px',
    color: '#FCA5A5',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '32px',
    marginBottom: '60px',
  },
  card: {
    background: 'rgba(26, 26, 26, 0.8)',
    borderRadius: '16px',
    padding: '24px',
    border: '2px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s',
    cursor: 'default',
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: '16px',
  },
  avatar: {
    width: '100%',
    aspectRatio: '1',
    borderRadius: '12px',
    objectFit: 'cover',
  },
  lockBadge: {
    position: 'absolute',
    top: '8px',
    left: '8px',
    background: 'rgba(0, 0, 0, 0.8)',
    padding: '8px',
    borderRadius: '50%',
    color: '#D4A017',
  },
  kidsBadge: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    background: '#3B82F6',
    color: '#fff',
    fontSize: '11px',
    fontWeight: '800',
    padding: '6px 12px',
    borderRadius: '20px',
  },
  cardInfo: {
    textAlign: 'center',
  },
  cardName: {
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '16px',
  },
  cardActions: {
    display: 'flex',
    gap: '8px',
  },
  editButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px 16px',
    background: 'rgba(212, 160, 23, 0.2)',
    border: '1px solid rgba(212, 160, 23, 0.5)',
    borderRadius: '8px',
    color: '#D4A017',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s',
  },
  deleteButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px 16px',
    background: 'rgba(239, 68, 68, 0.2)',
    border: '1px solid rgba(239, 68, 68, 0.5)',
    borderRadius: '8px',
    color: '#EF4444',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s',
  },
  addCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: '2px dashed rgba(212, 160, 23, 0.5)',
    background: 'rgba(26, 26, 26, 0.4)',
  },
  addIcon: {
    color: '#D4A017',
    marginBottom: '16px',
  },
  addText: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#D4A017',
  },
  doneContainer: {
    textAlign: 'center',
  },
  doneButton: {
    padding: '16px 48px',
    background: 'linear-gradient(to right, #D4A017, #f0c419)',
    color: '#000',
    border: 'none',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: '800',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.95)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modal: {
    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
    borderRadius: '24px',
    border: '2px solid rgba(212, 160, 23, 0.3)',
    maxWidth: '640px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto',
    padding: '40px',
    position: 'relative',
  },
  modalClose: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'none',
    border: 'none',
    color: '#9CA3AF',
    cursor: 'pointer',
    padding: 0,
  },
  modalTitle: {
    fontSize: '32px',
    fontWeight: '900',
    marginBottom: '32px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  formError: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    background: 'rgba(239, 68, 68, 0.2)',
    border: '1px solid rgba(239, 68, 68, 0.5)',
    borderRadius: '8px',
    color: '#FCA5A5',
    fontSize: '14px',
  },
  formSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  formLabel: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#D4A017',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  avatarLoading: {
    padding: '40px',
    display: 'flex',
    justifyContent: 'center',
  },
  avatarGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
    gap: '12px',
  },
  avatarOption: {
    position: 'relative',
    aspectRatio: '1',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  avatarOptionImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  avatarCheck: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(212, 160, 23, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    background: 'rgba(0, 0, 0, 0.6)',
    border: '2px solid',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  errorText: {
    color: '#EF4444',
    fontSize: '13px',
  },
  hintText: {
    color: '#6B7280',
    fontSize: '13px',
  },
  switchLabel: {
    display: 'flex',
    gap: '16px',
    cursor: 'pointer',
    padding: '16px',
    background: 'rgba(0, 0, 0, 0.4)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  checkbox: {
    width: '24px',
    height: '24px',
    cursor: 'pointer',
  },
  switchContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  switchTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#fff',
  },
  switchDescription: {
    fontSize: '13px',
    color: '#9CA3AF',
  },
  pinWrapper: {
    position: 'relative',
  },
  pinToggle: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#9CA3AF',
    cursor: 'pointer',
    padding: '8px',
  },
  formButtons: {
    display: 'flex',
    gap: '12px',
    marginTop: '16px',
  },
  cancelButton: {
    flex: 1,
    padding: '16px',
    background: 'transparent',
    border: '2px solid #374151',
    borderRadius: '12px',
    color: '#D1D5DB',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  submitButton: {
    flex: 1,
    padding: '16px',
    background: 'linear-gradient(to right, #D4A017, #f0c419)',
    border: 'none',
    borderRadius: '12px',
    color: '#000',
    fontSize: '16px',
    fontWeight: '800',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.3s',
  },
  deleteConfirmButton: {
    flex: 1,
    padding: '16px',
    background: 'linear-gradient(to right, #EF4444, #DC2626)',
    border: 'none',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '800',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  deleteContent: {
    textAlign: 'center',
    padding: '24px 0',
  },
  deleteAvatarWrapper: {
    position: 'relative',
    width: '120px',
    height: '120px',
    margin: '0 auto 24px',
  },
  deleteAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  deleteName: {
    fontSize: '24px',
    fontWeight: '900',
    marginBottom: '16px',
  },
  deleteWarning: {
    fontSize: '15px',
    color: '#D1D5DB',
    marginBottom: '12px',
    lineHeight: '1.6',
  },
  deleteWarningStrong: {
    fontSize: '15px',
    color: '#EF4444',
    fontWeight: '700',
  },
};

export default ManageProfiles;