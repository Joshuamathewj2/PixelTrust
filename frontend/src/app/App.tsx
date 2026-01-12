import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { DomainPage } from './components/DomainPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/domain/food-delivery" element={
          <DomainPage
            domainKey="food-delivery"
            title="Food Delivery Platforms"
            tagline="Verify Supply Chain & Product Authenticity"
            color="#39FF14"
            description="Trace food from farm to table. Verify timestamps, logistics paths, and ensure quality control through blockchain-based verification."
          />
        } />
        <Route path="/domain/fake-news" element={
          <DomainPage
            domainKey="fake-news"
            title="Fake News Verification"
            tagline="Combat Misinformation with Truth"
            color="#2979FF"
            description="Analyze images and videos for tampering, verify sources, and detect AI-generated content with advanced digital forensics."
          />
        } />
        <Route path="/domain/legal-evidence" element={
          <DomainPage
            domainKey="legal-evidence"
            title="Legal Evidence Validation"
            tagline="Ensure Courtroom Integrity"
            color="#B026FF"
            description="Validate digital evidence, verify timestamps, check authenticity of documents, and maintain chain of custody with cryptographic hashing."
          />
        } />
        <Route path="/domain/online-marketplaces" element={
          <DomainPage
            domainKey="online-marketplaces"
            title="Online Marketplaces"
            tagline="Trust Every Transaction"
            color="#FF9100"
            description="Verify product images, detect counterfeits, validate seller credentials, and ensure transparency in e-commerce transactions."
          />
        } />
      </Routes>
    </Router>
  );
}
