import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { attemptGetUser } from "./store/thunks/user";
import { useAppDispatch } from "./store/hooks";
import { AuthRoute } from "./components/AuthRoute";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AboutUs from "./pages/AboutUs";
import TermsAndConditions from "./pages/TermsAndConditions";
import ContactUs from "./pages/ContactUs";
import { HelmetProvider } from "react-helmet-async";
import NotFound from "./pages/NotFound";
import { ConfirmPage, HomePage } from "./pages";
import Layout from "./components/Layout";
const SiteMap = () => {
  return `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

    <url>
        <loc>https://thespinnerwheel.com/</loc>
        <lastmod>2025-03-19</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>

    <url>
        <loc>https://thespinnerwheel.com/yes-or-no-wheel</loc>
        <lastmod>2025-03-19</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>

 <url>
        <loc>https://thespinnerwheel.com/random-number-generator</loc>
        <lastmod>2025-03-19</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>

 <url>
        <loc>https://thespinnerwheel.com/random-letter-generator</loc>
        <lastmod>2025-03-19</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>




    <url>
        <loc>https://thespinnerwheel.com/about-us</loc>
        <lastmod>2025-03-19</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.5</priority>
    </url>

    <url>
        <loc>https://thespinnerwheel.com/contact-us</loc>
        <lastmod>2025-03-19</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
    </url>

 <url>
        <loc>https://thespinnerwheel.com/privacy-policy</loc>
        <lastmod>2025-03-19</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
    </url>

 <url>
        <loc>https://thespinnerwheel.com/terms-and-conditions</loc>
        <lastmod>2025-03-19</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
    </url>

</urlset>


`;
};

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(attemptGetUser());
  }, [dispatch]);

  return (
    <HelmetProvider>
      <Layout>
        <Routes>
          <Route
            path="/account/confirm/:token"
            element={
              <AuthRoute>
                <ConfirmPage />
              </AuthRoute>
            }
          />
          <Route path="/" element={<HomePage />} />

          {/* Explicit wheel routes for better SEO */}
          <Route
            path="/yes-or-no-wheel"
            element={
              <HomePage canonicalUrl="https://thespinnerwheel.com/yes-or-no-wheel" />
            }
          />
          <Route
            path="/random-number-generator"
            element={
              <HomePage canonicalUrl="https://thespinnerwheel.com/random-number-generator" />
            }
          />
          <Route
            path="/random-letter-generator"
            element={
              <HomePage canonicalUrl="https://thespinnerwheel.com/random-letter-generator" />
            }
          />
          <Route
            path="/random-name-picker"
            element={
              <HomePage canonicalUrl="https://thespinnerwheel.com/random-name-picker" />
            }
          />
          <Route
            path="/random-team-generator"
            element={
              <HomePage canonicalUrl="https://thespinnerwheel.com/random-team-generator" />
            }
          />

          {/* Other static routes */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/sitemap.xml" element={<SiteMap />} />

          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </HelmetProvider>
  );
}
