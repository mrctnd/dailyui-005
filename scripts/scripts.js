// Profile interactions and animations
class ProfileManager {
  constructor() {
    this.isFollowing = false;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.animateOnLoad();
  }

  setupEventListeners() {
    // Profile image click to enlarge
    document.getElementById('profileImage').addEventListener('click', this.enlargeImage);
    
    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });

    // Click outside modal to close
    document.getElementById('modalOverlay').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        this.closeModal();
      }
    });
  }

  animateOnLoad() {
    // Stagger animation for elements
    const elements = document.querySelectorAll('.skill-tag, .badge, .activity-item');
    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.1}s`;
    });
  }

  enlargeImage() {
    const img = document.getElementById('profileImage');
    img.style.transform = 'scale(1.1)';
    img.style.transition = 'transform 0.3s ease';
    
    setTimeout(() => {
      img.style.transform = 'scale(1)';
    }, 300);
  }

  closeModal() {
    const modal = document.getElementById('modalOverlay');
    modal.classList.remove('active');
  }
}

// Global functions for HTML onclick events
function followUser() {
  const btn = event.target.closest('.btn-primary');
  const icon = btn.querySelector('i');
  const text = btn.childNodes[2]; // Text node after icon and space
  
  if (profileManager.isFollowing) {
    // Unfollow
    btn.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
    icon.className = 'fas fa-user-plus';
    text.textContent = 'Follow';
    profileManager.isFollowing = false;
    
    // Update follower count
    updateFollowerCount(-1);
    showNotification('Unfollowed Alex Johnson', 'info');
  } else {
    // Follow
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    icon.className = 'fas fa-user-check';
    text.textContent = 'Following';
    profileManager.isFollowing = true;
    
    // Add animation
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      btn.style.transform = 'scale(1)';
    }, 150);
    
    // Update follower count
    updateFollowerCount(1);
    showNotification('Now following Alex Johnson!', 'success');
  }
}

function messageUser() {
  const btn = event.target.closest('.btn-secondary');
  
  // Add loading state
  btn.classList.add('loading');
  btn.style.position = 'relative';
  
  setTimeout(() => {
    btn.classList.remove('loading');
    showNotification('Message sent to Alex Johnson!', 'success');
    
    // Simulate opening message interface
    console.log('Opening message interface...');
  }, 1500);
}

function showMoreOptions() {
  const modal = document.getElementById('modalOverlay');
  modal.classList.add('active');
}

function closeModal() {
  profileManager.closeModal();
}

function updateFollowerCount(change) {
  const followerStat = document.querySelector('.stat-item:nth-child(2) .stat-number');
  let currentCount = parseFloat(followerStat.textContent.replace('K', '')) * 1000;
  currentCount += change;
  
  // Format number
  if (currentCount >= 1000) {
    followerStat.textContent = (currentCount / 1000).toFixed(1) + 'K';
  } else {
    followerStat.textContent = currentCount.toString();
  }
  
  // Add animation
  followerStat.style.transform = 'scale(1.2)';
  followerStat.style.color = '#667eea';
  
  setTimeout(() => {
    followerStat.style.transform = 'scale(1)';
    followerStat.style.color = '#1f2937';
  }, 300);
}

function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas ${getNotificationIcon(type)}"></i>
      <span>${message}</span>
    </div>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${getNotificationColor(type)};
    color: white;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    z-index: 1001;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 300px;
  `;
  
  notification.querySelector('.notification-content').style.cssText = `
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    font-weight: 500;
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

function getNotificationIcon(type) {
  const icons = {
    success: 'fa-check-circle',
    error: 'fa-exclamation-circle',
    info: 'fa-info-circle',
    warning: 'fa-exclamation-triangle'
  };
  return icons[type] || icons.info;
}

function getNotificationColor(type) {
  const colors = {
    success: 'linear-gradient(135deg, #10b981, #059669)',
    error: 'linear-gradient(135deg, #ef4444, #dc2626)',
    info: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    warning: 'linear-gradient(135deg, #f59e0b, #d97706)'
  };
  return colors[type] || colors.info;
}

// Simulate real-time updates
function simulateRealTimeUpdates() {
  setInterval(() => {
    // Randomly update online status
    const statusIndicator = document.querySelector('.status-indicator');
    const isOnline = Math.random() > 0.3; // 70% chance of being online
    
    statusIndicator.className = `status-indicator ${isOnline ? 'online' : 'offline'}`;
  }, 30000); // Every 30 seconds

  // Simulate activity updates
  setInterval(() => {
    addRandomActivity();
  }, 60000); // Every minute
}

function addRandomActivity() {
  const activities = [
    { icon: 'fa-heart', action: 'Liked', target: "Maria's portfolio", time: 'Just now' },
    { icon: 'fa-comment', action: 'Commented', target: 'on Design System Guide', time: '1 min ago' },
    { icon: 'fa-share', action: 'Shared', target: 'UI Inspiration post', time: '2 min ago' },
    { icon: 'fa-star', action: 'Rated', target: 'Mobile App Project', time: '3 min ago' }
  ];
  
  const randomActivity = activities[Math.floor(Math.random() * activities.length)];
  const activityList = document.querySelector('.activity-list');
  
  // Create new activity item
  const newActivity = document.createElement('div');
  newActivity.className = 'activity-item';
  newActivity.style.opacity = '0';
  newActivity.style.transform = 'translateY(-10px)';
  
  newActivity.innerHTML = `
    <div class="activity-icon">
      <i class="fas ${randomActivity.icon}"></i>
    </div>
    <div class="activity-content">
      <p><strong>${randomActivity.action}</strong> ${randomActivity.target}</p>
      <span class="activity-time">${randomActivity.time}</span>
    </div>
  `;
  
  // Add to top of list
  activityList.insertBefore(newActivity, activityList.firstChild);
  
  // Animate in
  setTimeout(() => {
    newActivity.style.opacity = '1';
    newActivity.style.transform = 'translateY(0)';
    newActivity.style.transition = 'all 0.3s ease';
  }, 100);
  
  // Remove oldest if more than 5 activities
  if (activityList.children.length > 5) {
    const lastActivity = activityList.lastChild;
    lastActivity.style.opacity = '0';
    lastActivity.style.transform = 'translateY(10px)';
    setTimeout(() => {
      activityList.removeChild(lastActivity);
    }, 300);
  }
}

// Skills interaction
function addSkillInteraction() {
  const skillTags = document.querySelectorAll('.skill-tag');
  
  skillTags.forEach(tag => {
    tag.addEventListener('click', () => {
      // Create ripple effect
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      `;
      
      const rect = tag.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (rect.width / 2 - size / 2) + 'px';
      ripple.style.top = (rect.height / 2 - size / 2) + 'px';
      
      tag.style.position = 'relative';
      tag.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
      
      showNotification(`Skill: ${tag.textContent}`, 'info');
    });
  });
  
  // Add ripple animation CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Initialize profile manager
const profileManager = new ProfileManager();

// Start real-time updates and interactions
document.addEventListener('DOMContentLoaded', () => {
  simulateRealTimeUpdates();
  addSkillInteraction();
  
  // Add smooth scrolling for better UX
  document.documentElement.style.scrollBehavior = 'smooth';
});
