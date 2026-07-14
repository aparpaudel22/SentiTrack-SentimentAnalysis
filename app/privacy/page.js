export default function PrivacyPolicyPage() {
  return (
    <div className="container-page" style={{ maxWidth: 760, paddingTop: 56, paddingBottom: 80 }}>
      <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 6 }}>Privacy Policy</h1>
      <p style={{ color: "var(--color-muted)", fontSize: 14, marginBottom: 36 }}>
        Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      <Section title="1. Who We Are">
        SentiTrack is a social media sentiment analysis platform. We help businesses and individuals understand public sentiment from social media comments
        across Facebook, Instagram, TikTok, YouTube,and X (Twitter). Our contact email is{" "}
        <strong>sentitrack.support@gmail.com</strong>.
      </Section>

      <Section title="2. What Information We Collect">
        <p style={{ marginBottom: 10 }}>We collect only what is strictly necessary to operate the service:</p>
        <ul style={{ paddingLeft: 20, lineHeight: 1.9, color: "var(--color-text)" }}>
          <li><strong>Account information:</strong> your name and email address when you sign up with email/password.</li>
          <li><strong>OAuth profile data:</strong> your name and email as provided by Google or Apple when you choose to sign in through those services. We do not receive your Google or Apple password.</li>
          <li><strong>Analysis data:</strong> comments or links you submit for sentiment analysis. These are processed to return a result and are not stored on our servers beyond the duration of the request.</li>
          <li><strong>Report history:</strong> sentiment results you generate are stored locally in your browser (localStorage) on your device, tied to your account email. This data never leaves your device to our servers.</li>
        </ul>
      </Section>

      <Section title="3. How We Use Your Information">
        <ul style={{ paddingLeft: 20, lineHeight: 1.9, color: "var(--color-text)" }}>
          <li>To authenticate you and maintain your login session.</li>
          <li>To process your submitted comments through the sentiment analysis model and return results to you.</li>
          <li>To display your report history on your device across sessions.</li>
          <li>We do not sell, rent, or share your personal data with third parties for advertising or marketing purposes.</li>
        </ul>
      </Section>

      <Section title="4. Third-Party Services">
        <p>We integrate with the following third-party authentication providers. Their privacy policies govern how they handle your data during the login process:</p>
        <ul style={{ paddingLeft: 20, lineHeight: 1.9, color: "var(--color-text)", marginTop: 8 }}>
          <li><strong>Google Sign-In:</strong> governed by <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-primary)" }}>Google's Privacy Policy</a>.</li>
          <li><strong>Apple Sign-In:</strong> governed by <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-primary)" }}>Apple's Privacy Policy</a>.</li>
        </ul>
      </Section>

      <Section title="5. Data Storage & Security">
        <ul style={{ paddingLeft: 20, lineHeight: 1.9, color: "var(--color-text)" }}>
          <li>Email/password account credentials are stored in a local server file. Passwords are hashed using bcrypt before storage — your plain-text password is never saved anywhere.</li>
          <li>Login sessions are managed using signed, encrypted JWT tokens stored in HTTP-only cookies, which cannot be accessed by JavaScript running in the browser.</li>
          <li>Your report history is stored only in your own browser's localStorage and is never transmitted to or stored on our servers.</li>
        </ul>
      </Section>

      <Section title="6. Your Rights">
        You may request deletion of your account and any associated data at any time by contacting us at{" "}
        <strong>sentitrack.support@gmail.com</strong>. Since report history is stored locally in your browser,
        you can clear it at any time through your browser settings or via the SentiTrack History page.
      </Section>

      <Section title="7. Changes to This Policy">
        We may update this Privacy Policy as the project evolves. Continued use of SentiTrack after changes
        are posted constitutes your acceptance of the updated policy. The date at the top of this page will
        always reflect the most recent update.
      </Section>

      <Section title="8. Contact">
        For any privacy-related questions, contact us at: <strong>sentitrack.support@gmail.com</strong> or call{" "}
        <strong>+977 981-2345678</strong>.
      </Section>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="card" style={{ padding: 28, marginBottom: 20 }}>
      <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>{title}</h2>
      <div style={{ fontSize: 14, lineHeight: 1.8, color: "var(--color-text)" }}>{children}</div>
    </div>
  );
}