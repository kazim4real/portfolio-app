export type Lang = 'fr' | 'en';

export const TRANSLATIONS: Record<string, Record<Lang, string>> = {
  'nav.home': { fr: 'Accueil', en: 'Home' },
  'nav.about': { fr: 'À propos', en: 'About' },
  'nav.projects': { fr: 'Projets', en: 'Projects' },
  'nav.experience': { fr: 'Expérience', en: 'Experience' },
  'nav.skills': { fr: 'Compétences', en: 'Skills' },
  'nav.blog': { fr: 'Blog', en: 'Blog' },
  'nav.contact': { fr: 'Contact', en: 'Contact' },

  'home.greeting': { fr: "Salut, je suis", en: "Hi, I'm" },
  'home.viewProjects': { fr: 'Voir mes projets', en: 'View Projects' },
  'home.getInTouch': { fr: 'Me contacter', en: 'Get in Touch' },
  'home.featured': { fr: 'Projets phares', en: 'Featured Projects' },
  'home.noFeatured': { fr: "Aucun projet mis en avant pour l'instant.", en: 'No featured projects yet.' },
  'home.learnMore': { fr: 'En savoir plus →', en: 'Learn more →' },

  'about.title': { fr: 'À propos de moi', en: 'About Me' },
  'about.empty': { fr: 'Profil non configuré pour le moment.', en: 'Profile not set up yet.' },
  'about.resume': { fr: 'Télécharger le CV', en: 'Download Resume' },

  'projects.title': { fr: 'Projets', en: 'Projects' },
  'projects.empty': { fr: 'Aucun projet pour le moment.', en: 'No projects yet.' },

  'projectDetail.back': { fr: '← Retour aux projets', en: '← Back to projects' },
  'projectDetail.github': { fr: 'Code source', en: 'GitHub' },
  'projectDetail.live': { fr: 'Voir la démo', en: 'Live Demo' },
  'projectDetail.loading': { fr: 'Chargement…', en: 'Loading…' },

  'experience.title': { fr: 'Expérience', en: 'Experience' },
  'experience.present': { fr: 'Aujourd\'hui', en: 'Present' },
  'experience.empty': { fr: 'Aucune expérience pour le moment.', en: 'No experience yet.' },

  'skills.title': { fr: 'Compétences', en: 'Skills' },
  'skills.empty': { fr: 'Aucune compétence pour le moment.', en: 'No skills yet.' },

  'blog.title': { fr: 'Blog', en: 'Blog' },
  'blog.empty': { fr: 'Aucun article publié pour le moment.', en: 'No published posts yet.' },

  'blogDetail.back': { fr: '← Retour au blog', en: '← Back to blog' },
  'blogDetail.loading': { fr: 'Chargement…', en: 'Loading…' },

  'contact.title': { fr: 'Me contacter', en: 'Get in Touch' },
  'contact.subtitle': { fr: 'Une question, un projet en tête ? Envoyez-moi un message.', en: 'Have a question or a project in mind? Send me a message.' },
  'contact.name': { fr: 'Nom', en: 'Name' },
  'contact.email': { fr: 'Email', en: 'Email' },
  'contact.subject': { fr: 'Sujet', en: 'Subject' },
  'contact.message': { fr: 'Message', en: 'Message' },
  'contact.send': { fr: 'Envoyer', en: 'Send Message' },
  'contact.sending': { fr: 'Envoi…', en: 'Sending…' },
  'contact.success': { fr: '✅ Merci — votre message a été envoyé.', en: "✅ Thanks — your message has been sent." },
  'contact.error': { fr: "Une erreur s'est produite. Merci de réessayer.", en: 'Something went wrong. Please try again.' },

  'footer.text': { fr: 'Conçu avec Django & Angular.', en: 'Built with Django & Angular.' },
};