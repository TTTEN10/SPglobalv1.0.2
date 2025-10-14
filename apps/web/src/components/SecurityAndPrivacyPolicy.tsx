import React from 'react'
import { Shield, Lock, Eye, Users, FileText, CheckCircle } from 'lucide-react'
import Header from './Header'
import Footer from './Footer'

const SecurityAndPrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header showBackButton={true} />

      {/* Main Content */}
      <main className="flex-1">
        <section className="section-padding py-8 lg:py-12">
          <div className="container-max">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-heading leading-tight mb-6">
                <span className="text-[1.08em]">Security and</span>{' '}
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent text-[1.2em] font-bold">
                  Privacy Policy
                </span>
              </h1>
              <p className="text-xl text-body leading-relaxed max-w-3xl mx-auto">
                Comprehensive data protection and security measures for your mental health journey
              </p>
            </div>

            {/* Security Overview */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 lg:p-16 shadow-lg border border-neutral-dark/20 dark:bg-black/30 dark:border-white/20 mb-16">
              <h2 className="text-3xl lg:text-4xl text-heading mb-8 text-center">
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Security Overview
                </span>
              </h2>
              <p className="text-lg text-body leading-relaxed text-center max-w-4xl mx-auto mb-12">
                SafePsy implements comprehensive security measures to protect user data, ensure privacy, 
                and maintain system integrity. Our multi-layer security model provides enterprise-grade 
                protection for your sensitive mental health information.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="space-y-4 text-center">
                  <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center border border-primary-200 dark:bg-primary-900/30 dark:border-primary-700">
                    <Shield className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl text-heading">Network Security</h3>
                  <p className="text-body">
                    HTTPS/TLS encryption, security headers, rate limiting, and DDoS protection
                  </p>
                </div>
                
                <div className="space-y-4 text-center">
                  <div className="w-16 h-16 mx-auto bg-secondary-100 rounded-full flex items-center justify-center border border-secondary-200 dark:bg-secondary-900/30 dark:border-secondary-700">
                    <Lock className="w-8 h-8 text-secondary-600 dark:text-secondary-400" />
                  </div>
                  <h3 className="text-xl text-heading">Data Security</h3>
                  <p className="text-body">
                    AES-256 encryption, DID-based access control, and secure key management
                  </p>
                </div>
                
                <div className="space-y-4 text-center">
                  <div className="w-16 h-16 mx-auto bg-accent-100 rounded-full flex items-center justify-center border border-accent-200 dark:bg-accent-900/30 dark:border-accent-700">
                    <Eye className="w-8 h-8 text-accent-600 dark:text-accent-400" />
                  </div>
                  <h3 className="text-xl text-heading">Application Security</h3>
                  <p className="text-body">
                    Input validation, authentication, session management, and CSRF protection
                  </p>
                </div>
                
                <div className="space-y-4 text-center">
                  <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center border border-primary-200 dark:bg-primary-900/30 dark:border-primary-700">
                    <Users className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl text-heading">Infrastructure Security</h3>
                  <p className="text-body">
                    Container security, network segmentation, monitoring, and incident response
                  </p>
                </div>
              </div>
            </div>

            {/* Encryption Standards */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 lg:p-16 shadow-lg border border-neutral-dark/20 dark:bg-black/30 dark:border-white/20 mb-16">
              <h2 className="text-3xl lg:text-4xl text-heading mb-12 text-center">
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Encryption Standards
                </span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="text-2xl text-heading mb-4">Data Protection</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="text-lg text-heading">AES-256-GCM Encryption</h4>
                        <p className="text-body">Industry-standard encryption for all sensitive data at rest and in transit</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="text-lg text-heading">TLS 1.3</h4>
                        <p className="text-body">Latest transport layer security for secure data transmission</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="text-lg text-heading">PBKDF2 Key Derivation</h4>
                        <p className="text-body">100,000 iterations for secure key generation from user passwords</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="text-lg text-heading">SHA-256 Integrity</h4>
                        <p className="text-body">Data integrity verification and tamper detection</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl text-heading mb-4">Access Control</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="text-lg text-heading">DID-Based Authentication</h4>
                        <p className="text-body">Decentralized identity management with cryptographic key pairs</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="text-lg text-heading">User-Controlled Keys</h4>
                        <p className="text-body">Users maintain control over their encryption keys (never stored on servers)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="text-lg text-heading">Role-Based Permissions</h4>
                        <p className="text-body">Granular access control for therapists and authorized personnel</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="text-lg text-heading">Audit Logging</h4>
                        <p className="text-body">Complete access logging and audit trails for all data operations</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Protection Rights */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 lg:p-16 shadow-lg border border-neutral-dark/20 dark:bg-black/30 dark:border-white/20 mb-16">
              <h2 className="text-3xl lg:text-4xl text-heading mb-12 text-center">
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Your Data Protection Rights
                </span>
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center border border-primary-200">
                    <Eye className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl text-heading text-center">Right to Access</h3>
                  <p className="text-body text-center">
                    Access all your personal data processed by SafePsy through our encrypted APIs within 30 days
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-secondary-100 rounded-full flex items-center justify-center border border-secondary-200">
                    <FileText className="w-8 h-8 text-secondary-600" />
                  </div>
                  <h3 className="text-xl text-heading text-center">Right to Rectification</h3>
                  <p className="text-body text-center">
                    Correct or update your personal data with encrypted data update mechanisms
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-accent-100 rounded-full flex items-center justify-center border border-accent-200">
                    <Lock className="w-8 h-8 text-accent-600" />
                  </div>
                  <h3 className="text-xl text-heading text-center">Right to Erasure</h3>
                  <p className="text-body text-center">
                    Complete data removal from all systems with cryptographic data deletion
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center border border-primary-200">
                    <Shield className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl text-heading text-center">Right to Portability</h3>
                  <p className="text-body text-center">
                    Export all your data in a structured, machine-readable format
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-secondary-100 rounded-full flex items-center justify-center border border-secondary-200">
                    <Users className="w-8 h-8 text-secondary-600" />
                  </div>
                  <h3 className="text-xl text-heading text-center">Right to Restrict Processing</h3>
                  <p className="text-body text-center">
                    Limit data processing for specific purposes or data types
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-accent-100 rounded-full flex items-center justify-center border border-accent-200">
                    <CheckCircle className="w-8 h-8 text-accent-600" />
                  </div>
                  <h3 className="text-xl text-heading text-center">Consent Management</h3>
                  <p className="text-body text-center">
                    Granular consent controls with immediate withdrawal capabilities
                  </p>
                </div>
              </div>
            </div>

            {/* Compliance */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 lg:p-16 shadow-lg border border-neutral-dark/20 dark:bg-black/30 dark:border-white/20 mb-16">
              <h2 className="text-3xl lg:text-4xl text-heading mb-12 text-center">
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Regulatory Compliance
                </span>
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center border border-green-200">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-xl text-heading">GDPR</h3>
                  <p className="text-body">General Data Protection Regulation compliance with all data subject rights</p>
                </div>
                
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center border border-blue-200">
                    <CheckCircle className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl text-heading">HIPAA</h3>
                  <p className="text-body">Health Insurance Portability and Accountability Act compliance</p>
                </div>
                
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto bg-purple-100 rounded-full flex items-center justify-center border border-purple-200">
                    <CheckCircle className="w-10 h-10 text-purple-600" />
                  </div>
                  <h3 className="text-xl text-heading">ISO 27001</h3>
                  <p className="text-body">Information Security Management System certification</p>
                </div>
                
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center border border-orange-200">
                    <CheckCircle className="w-10 h-10 text-orange-600" />
                  </div>
                  <h3 className="text-xl text-heading">APA/EFPA</h3>
                  <p className="text-body">American Psychological Association and European Federation compliance</p>
                </div>
              </div>

              {/* GDPR Compliance Details */}
              <div className="mb-12">
                <h3 className="text-2xl text-heading mb-6 text-center">
                  <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                    GDPR Compliance
                  </span>
                </h3>
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                  <div className="space-y-4 text-center">
                    <h4 className="text-lg text-heading font-semibold">Data Subject Rights Implementation</h4>
                    <div className="space-y-3">
                      <div className="text-center">
                        <p className="text-body font-medium">Right to Access (Article 15)</p>
                        <p className="text-sm text-body">Complete data export via encrypted APIs within 30 days</p>
                      </div>
                      <div className="text-center">
                        <p className="text-body font-medium">Right to Rectification (Article 16)</p>
                        <p className="text-sm text-body">Real-time data correction with cryptographic integrity verification</p>
                      </div>
                      <div className="text-center">
                        <p className="text-body font-medium">Right to Erasure (Article 17)</p>
                        <p className="text-sm text-body">Cryptographic data deletion from all systems and backups</p>
                      </div>
                      <div className="text-center">
                        <p className="text-body font-medium">Right to Portability (Article 20)</p>
                        <p className="text-sm text-body">Machine-readable data export in JSON/XML formats</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 text-center">
                    <h4 className="text-lg text-heading font-semibold">Privacy Principles</h4>
                    <div className="space-y-3">
                      <div className="text-center">
                        <p className="text-body font-medium">Lawfulness & Transparency</p>
                        <p className="text-sm text-body">Clear consent mechanisms and transparent processing</p>
                      </div>
                      <div className="text-center">
                        <p className="text-body font-medium">Purpose Limitation</p>
                        <p className="text-sm text-body">Data processing limited to stated therapy purposes</p>
                      </div>
                      <div className="text-center">
                        <p className="text-body font-medium">Data Minimization</p>
                        <p className="text-sm text-body">Only necessary data collected for therapy services</p>
                      </div>
                      <div className="text-center">
                        <p className="text-body font-medium">Storage Limitation</p>
                        <p className="text-sm text-body">Automatic deletion after retention periods expire</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* HIPAA Compliance Details */}
              <div className="mb-12">
                <h3 className="text-2xl text-heading mb-6 text-center">
                  <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                    HIPAA Compliance
                  </span>
                </h3>
                <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                  <div className="space-y-4 text-center">
                    <h4 className="text-lg text-heading font-semibold">Administrative Safeguards</h4>
                    <div className="space-y-3">
                      <div className="text-center">
                        <p className="text-body font-medium">Security Officer</p>
                        <p className="text-sm text-body">Designated HIPAA security officer with documented responsibilities</p>
                      </div>
                      <div className="text-center">
                        <p className="text-body font-medium">Workforce Training</p>
                        <p className="text-sm text-body">Regular HIPAA compliance training for all staff</p>
                      </div>
                      <div className="text-center">
                        <p className="text-body font-medium">Access Management</p>
                        <p className="text-sm text-body">Role-based access controls with regular reviews</p>
                      </div>
                      <div className="text-center">
                        <p className="text-body font-medium">Incident Response</p>
                        <p className="text-sm text-body">Documented breach response procedures and reporting</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 text-center">
                    <h4 className="text-lg text-heading font-semibold">Physical Safeguards</h4>
                    <div className="space-y-3">
                      <div className="text-center">
                        <p className="text-body font-medium">Facility Access</p>
                        <p className="text-sm text-body">Physical access controls for data centers and offices</p>
                      </div>
                      <div className="text-center">
                        <p className="text-body font-medium">Workstation Security</p>
                        <p className="text-sm text-body">Secure workstation policies and device controls</p>
                      </div>
                      <div className="text-center">
                        <p className="text-body font-medium">Media Controls</p>
                        <p className="text-sm text-body">Secure handling and disposal of electronic media</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 text-center">
                    <h4 className="text-lg text-heading font-semibold">Technical Safeguards</h4>
                    <div className="space-y-3">
                      <div className="text-center">
                        <p className="text-body font-medium">Access Control</p>
                        <p className="text-sm text-body">Unique user identification and authentication</p>
                      </div>
                      <div className="text-center">
                        <p className="text-body font-medium">Audit Controls</p>
                        <p className="text-sm text-body">Comprehensive audit logging and monitoring</p>
                      </div>
                      <div className="text-center">
                        <p className="text-body font-medium">Data Integrity</p>
                        <p className="text-sm text-body">Cryptographic integrity verification and tamper detection</p>
                      </div>
                      <div className="text-center">
                        <p className="text-body font-medium">Transmission Security</p>
                        <p className="text-sm text-body">End-to-end encryption for all data transmission</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ISO 27001 Compliance Details */}
              <div className="mb-12">
                <h3 className="text-2xl text-heading mb-6 text-center">
                  <span className="bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                    ISO 27001 Information Security Management System
                  </span>
                </h3>
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                  <div className="space-y-4 text-center">
                    <h4 className="text-lg text-heading font-semibold">Information Security Management</h4>
                    <div className="space-y-3">
                      <div className="text-center">
                        <p className="text-body font-medium">ISMS Implementation</p>
                        <p className="text-sm text-body">Comprehensive Information Security Management System</p>
                      </div>
                      <div className="text-center">
                        <p className="text-body font-medium">Risk Management</p>
                        <p className="text-sm text-body">Regular risk assessments and mitigation strategies</p>
                      </div>
                      <div className="text-center">
                        <p className="text-body font-medium">Security Controls</p>
                        <p className="text-sm text-body">114 security controls implemented and monitored</p>
                      </div>
                      <div className="text-center">
                        <p className="text-body font-medium">Continuous Improvement</p>
                        <p className="text-sm text-body">Regular review and improvement of security measures</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 text-center">
                    <h4 className="text-lg text-heading font-semibold">Security Control Categories</h4>
                    <div className="space-y-3">
                      <div className="text-center">
                        <p className="text-body font-medium">Access Control (A.9)</p>
                        <p className="text-sm text-body">Comprehensive access management and authentication</p>
                      </div>
                      <div className="text-center">
                        <p className="text-body font-medium">Cryptography (A.10)</p>
                        <p className="text-sm text-body">Strong cryptographic controls for data protection</p>
                      </div>
                      <div className="text-center">
                        <p className="text-body font-medium">Operations Security (A.12)</p>
                        <p className="text-sm text-body">Secure operations and change management</p>
                      </div>
                      <div className="text-center">
                        <p className="text-body font-medium">Incident Management (A.16)</p>
                        <p className="text-sm text-body">Comprehensive incident response and management</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* APA/EFPA Compliance Details */}
              <div className="mb-12">
                <h3 className="text-2xl text-heading mb-6 text-center">
                  <span className="bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                    APA/EFPA Compliance
                  </span>
                </h3>
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                  <div className="space-y-4 text-center">
                    <h4 className="text-lg text-heading font-semibold">American Psychological Association (APA)</h4>
                    <div className="space-y-3">
                      <div className="text-center">
                        <p className="text-body font-medium">Ethical Principles</p>
                        <p className="text-sm text-body">Adherence to APA Ethical Principles of Psychologists</p>
                      </div>
                      <div className="text-center">
                        <p className="text-body font-medium">Confidentiality</p>
                        <p className="text-sm text-body">Strong confidentiality protections for therapy data</p>
                      </div>
                      <div className="text-center">
                        <p className="text-body font-medium">Professional Standards</p>
                        <p className="text-sm text-body">Compliance with professional therapy standards</p>
                      </div>
                      <div className="text-center">
                        <p className="text-body font-medium">Competence</p>
                        <p className="text-sm text-body">Maintenance of professional competence and training</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 text-center">
                    <h4 className="text-lg text-heading font-semibold">European Federation of Psychologists' Associations (EFPA)</h4>
                    <div className="space-y-3">
                      <div className="text-center">
                        <p className="text-body font-medium">European Standards</p>
                        <p className="text-sm text-body">Compliance with European psychology standards</p>
                      </div>
                      <div className="text-center">
                        <p className="text-body font-medium">Data Protection</p>
                        <p className="text-sm text-body">Enhanced data protection for European users</p>
                      </div>
                      <div className="text-center">
                        <p className="text-body font-medium">Professional Ethics</p>
                        <p className="text-sm text-body">Adherence to European professional ethics guidelines</p>
                      </div>
                      <div className="text-center">
                        <p className="text-body font-medium">Quality Assurance</p>
                        <p className="text-sm text-body">Continuous quality improvement in therapy services</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-transparent border border-green-200 dark:border-green-800 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg text-heading dark:text-white mb-2">Privacy by Design</h3>
                    <p className="text-body dark:text-white">
                      SafePsy implements privacy-by-design principles throughout our platform. We minimize data collection, 
                      use end-to-end encryption, provide granular consent controls, and ensure users maintain control 
                      over their personal information. Our architecture is built from the ground up to protect your privacy.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Categories */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 lg:p-16 shadow-lg border border-neutral-dark/20 dark:bg-black/30 dark:border-white/20 mb-16">
              <h2 className="text-3xl lg:text-4xl text-heading mb-12 text-center">
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Data Categories & Processing
                </span>
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-neutral-300 dark:border-gray-600">
                  <thead>
                    <tr className="bg-neutral-100 dark:bg-gray-800">
                      <th className="border border-neutral-300 dark:border-gray-600 px-4 py-3 text-left text-heading">Data Type</th>
                      <th className="border border-neutral-300 dark:border-gray-600 px-4 py-3 text-left text-heading">Purpose</th>
                      <th className="border border-neutral-300 dark:border-gray-600 px-4 py-3 text-left text-heading">Retention</th>
                      <th className="border border-neutral-300 dark:border-gray-600 px-4 py-3 text-left text-heading">Legal Basis</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-neutral-300 dark:border-gray-600 px-4 py-3 text-body">Identity Data (DID)</td>
                      <td className="border border-neutral-300 dark:border-gray-600 px-4 py-3 text-body">Identity verification and access control</td>
                      <td className="border border-neutral-300 dark:border-gray-600 px-4 py-3 text-body">User-controlled deletion</td>
                      <td className="border border-neutral-300 dark:border-gray-600 px-4 py-3 text-body">Consent, Contract</td>
                    </tr>
                    <tr>
                      <td className="border border-neutral-300 dark:border-gray-600 px-4 py-3 text-body">Health Data</td>
                      <td className="border border-neutral-300 dark:border-gray-600 px-4 py-3 text-body">Therapy provision and progress tracking</td>
                      <td className="border border-neutral-300 dark:border-gray-600 px-4 py-3 text-body">7 years (regulatory)</td>
                      <td className="border border-neutral-300 dark:border-gray-600 px-4 py-3 text-body">Consent, Vital Interests</td>
                    </tr>
                    <tr>
                      <td className="border border-neutral-300 dark:border-gray-600 px-4 py-3 text-body">Communication Data</td>
                      <td className="border border-neutral-300 dark:border-gray-600 px-4 py-3 text-body">Therapy conversations and sessions</td>
                      <td className="border border-neutral-300 dark:border-gray-600 px-4 py-3 text-body">30 days (configurable)</td>
                      <td className="border border-neutral-300 dark:border-gray-600 px-4 py-3 text-body">Consent, Contract</td>
                    </tr>
                    <tr>
                      <td className="border border-neutral-300 dark:border-gray-600 px-4 py-3 text-body">Technical Data</td>
                      <td className="border border-neutral-300 dark:border-gray-600 px-4 py-3 text-body">Platform security and optimization</td>
                      <td className="border border-neutral-300 dark:border-gray-600 px-4 py-3 text-body">12 months</td>
                      <td className="border border-neutral-300 dark:border-gray-600 px-4 py-3 text-body">Legitimate Interests</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Questions About Your Privacy */}
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl text-heading mb-6">
                Questions About Your Privacy?
              </h2>
              <p className="text-lg text-body mb-8 max-w-2xl mx-auto">
                We're committed to transparency and protecting your privacy. Contact us with any questions about our security measures or data protection practices.
              </p>
            </div>


          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default SecurityAndPrivacyPolicy
