// Configuration file for My Links website
// Edit these values to customize your website

const CONFIG = {
    // Profile Information
    profile: {
        name: "Hi! I'm Alessio 👋🏻",
        bio: "Full-Stack Marketer",
        image: "Ad_static_image.jpg" // Replace with your image URL
    },

    // Buttons
    links: [
        {
            title: "Latest Projects",
            url: "https://portfolio.alessiodaleo.xyz",
            icon: "fas fa-globe",
            isPrimary: true
        },
        {
            title: "Let's Talk",
            url: "https://cal.com/alessiodaleo",
            icon: "fas fa-calendar",
            isPrimary: false
        },
        
    ],
    
    // Theme Colors (optional - you can customize these)
    theme: {
        primaryGradient: "linear-gradient(135deg, #4740F0 0%, #262626 100%)",
        secondaryGradient: "linear-gradient(135deg, #262626 20%, #262626 80%)"
    },

    // Analytics (optional)
    analytics: {
        enabled: true,
        googleAnalyticsId: "", // Add your GA ID here
        trackPageViews: true,
        trackLinkClicks: true
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}





