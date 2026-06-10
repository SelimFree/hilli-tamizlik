const WEBSITE_URL = "https://www.your-website.com";
const COMPANY_NAME = "Your Company Name";
const LOGO_URL = "https://www.your-website.com/logo.png";

interface AutoReplyTranslation {
  subject: string;
  title: string;
  greeting: string;
  body1: string;
  body2: string;
  regards: string;
  contactTitle: string;
  linksTitle: string;
  legalTitle: string;
  links: {
    about: string;
    products: string;
    contact: string;
  };
  legal: {
    privacy: string;
    terms: string;
    cookie: string;
  };
  rightsReserved: string;
}

export const autoReplyTranslations: Record<string, AutoReplyTranslation> = {
  en: {
    subject: "Inquiry Acknowledgment - Meray Global",
    title: "Transmission Logged",
    greeting: "Attention:",
    body1:
      "Your trade inquiry has been securely received by the Meray Global server network. A preliminary compliance check is currently underway.",
    body2:
      "Our regional trading desk will review your requirements. You can expect direct communication from an authorized representative within one standard business day.",
    regards: "With regards",
    contactTitle: "Direct Contact",
    linksTitle: "Quick Links",
    legalTitle: "Legal",
    links: {
      about: "About Us",
      products: "Products",
      contact: "Contact",
    },
    legal: {
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      cookie: "Cookie Policy",
    },
    rightsReserved: "All rights reserved.",
  }
};

export const getOwnerEmailHtml = (
  fullName: string,
  company: string,
  email: string,
  department: string,
  message: string,
) => `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin: 0; padding: 0; background-color: #003B59; font-family: Arial, Helvetica, sans-serif;">
  <div style="max-width: 600px; margin: 40px auto; background-color: #006394; border: 1px solid #007AA8;">
    <img src="${LOGO_URL}" alt="Meray Global" style="display: block; margin: 0 auto; max-width: 100px; height: auto;">
    <!-- Header -->
    <div style="padding: 32px 40px; border-bottom: 3px solid #ff9900;">
      <p style="margin: 0 0 8px 0; color: #bae6fd; font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">Внутреннее системное оповещение</p>
      <h2 style="margin: 0; color: #ffffff; font-size: 18px; text-transform: uppercase; letter-spacing: 1px;">
        Входящий торговый запрос
      </h2>
    </div>

    <!-- Data Grid -->
    <div style="padding: 40px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px; border-collapse: collapse;">
        <tr>
          <td width="50%" style="padding: 20px; border: 1px solid #007AA8; background-color: #00547E;">
            <p style="margin: 0; font-size: 10px; font-weight: bold; color: #bae6fd; text-transform: uppercase; letter-spacing: 2px;">Организация</p>
            <p style="margin: 8px 0 0 0; font-size: 14px; color: #ffffff;">${company}</p>
          </td>
          <td width="50%" style="padding: 20px; border: 1px solid #007AA8; background-color: #006394;">
            <p style="margin: 0; font-size: 10px; font-weight: bold; color: #bae6fd; text-transform: uppercase; letter-spacing: 2px;">Контактное лицо</p>
            <p style="margin: 8px 0 0 0; font-size: 14px; color: #ffffff;">${fullName}</p>
          </td>
        </tr>
        <tr>
          <td width="50%" style="padding: 20px; border: 1px solid #007AA8; background-color: #006394;">
            <p style="margin: 0; font-size: 10px; font-weight: bold; color: #bae6fd; text-transform: uppercase; letter-spacing: 2px;">Электронная почта</p>
            <p style="margin: 8px 0 0 0; font-size: 14px;">
              <a href="mailto:${email}" style="color: #ff9900; text-decoration: none;">${email}</a>
            </p>
          </td>
          <td width="50%" style="padding: 20px; border: 1px solid #007AA8; background-color: #00547E;">
            <p style="margin: 0; font-size: 10px; font-weight: bold; color: #bae6fd; text-transform: uppercase; letter-spacing: 2px;">Целевой отдел</p>
            <p style="margin: 8px 0 0 0; font-size: 14px; color: #ffffff; text-transform: uppercase;">${department}</p>
          </td>
        </tr>
      </table>

      <!-- Message Block -->
      <div style="background-color: #00547E; border-left: 3px solid #ff9900; padding: 24px;">
        <p style="margin: 0 0 12px 0; font-size: 10px; font-weight: bold; color: #bae6fd; text-transform: uppercase; letter-spacing: 2px;">Детали запроса</p>
        <p style="margin: 0; color: #ffffff; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
      </div>
    </div>

  </div>
</body>
</html>
`;

export const getAutoReplyHtml = (firstName: string, lang: string = "en") => {
  const baseLang = lang.split("-")[0];
  const t = autoReplyTranslations[baseLang] || autoReplyTranslations["en"];
  const currentYear = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin: 0; padding: 0; background-color: #003B59; font-family: Arial, Helvetica, sans-serif;">
  <div style="max-width: 600px; margin: 40px auto; background-color: #006394; border: 1px solid #007AA8;">
    
    <!-- Header -->
    <div style="padding: 20px 40px; border-bottom: 1px solid #007AA8; text-align: left;">
      <img src="${LOGO_URL}" alt="${COMPANY_NAME} Logo" width="140" style="display: block; border: none; outline: none;" />
    </div>

    <!-- Body -->
    <div style="padding: 40px; border-bottom: 1px solid #007AA8;">
      <h2 style="margin: 0 0 24px 0; color: #ffffff; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">
        ${t.title}
      </h2>
      
      <p style="margin: 0 0 16px 0; color: #ff9900; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
        ${t.greeting} ${firstName}
      </p>
      
      <p style="margin: 0 0 16px 0; color: #ffffff; font-size: 14px; line-height: 1.7;">
        ${t.body1}
      </p>
      <p style="margin: 0 0 32px 0; color: #ffffff; font-size: 14px; line-height: 1.7;">
        ${t.body2}
      </p>
      
      <p style="margin: 0; color: #bae6fd; font-size: 12px; line-height: 1.6; text-transform: uppercase; letter-spacing: 1px;">
        ${t.regards},<br/>
        <strong style="color: #ffffff;">${COMPANY_NAME}</strong>
      </p>
    </div>

    <div style="padding: 40px;">
      
      <!-- Top Info -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
        <tr>
          <td valign="top">
            <p style="margin: 0 0 12px 0; font-size: 10px; font-weight: bold; color: #bae6fd; text-transform: uppercase; letter-spacing: 2px;">${t.contactTitle}</p>
            <p style="margin: 0; font-size: 12px;">
              <a href="mailto:info@merayglobal.com" style="color: #ffffff; text-decoration: none;">info@merayglobal.com</a>
            </p>
          </td>
        </tr>
      </table>

      <!-- Links Grid -->
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td valign="top" width="50%">
            <p style="margin: 0 0 16px 0; font-size: 10px; font-weight: bold; color: #bae6fd; text-transform: uppercase; letter-spacing: 2px;">${t.linksTitle}</p>
            <a href="${WEBSITE_URL}/about" style="display: block; color: #ffffff; text-decoration: none; font-size: 14px; margin-bottom: 12px;">${t.links.about}</a>
            <a href="${WEBSITE_URL}/products" style="display: block; color: #ffffff; text-decoration: none; font-size: 14px; margin-bottom: 12px;">${t.links.products}</a>
            <a href="${WEBSITE_URL}/contact" style="display: block; color: #ffffff; text-decoration: none; font-size: 14px; margin-bottom: 12px;">${t.links.contact}</a>
          </td>
          <td valign="top" width="50%">
            <p style="margin: 0 0 16px 0; font-size: 10px; font-weight: bold; color: #bae6fd; text-transform: uppercase; letter-spacing: 2px;">${t.legalTitle}</p>
            <a href="${WEBSITE_URL}/privacy" style="display: block; color: #ffffff; text-decoration: none; font-size: 14px; margin-bottom: 12px;">${t.legal.privacy}</a>
            <a href="${WEBSITE_URL}/terms" style="display: block; color: #ffffff; text-decoration: none; font-size: 14px; margin-bottom: 12px;">${t.legal.terms}</a>
            <a href="${WEBSITE_URL}/cookies" style="display: block; color: #ffffff; text-decoration: none; font-size: 14px; margin-bottom: 12px;">${t.legal.cookie}</a>
          </td>
        </tr>
      </table>

      <!-- Copyright -->
      <div style="margin-top: 32px; border-top: 1px solid #007AA8; padding-top: 24px; text-align: left;">
        <p style="margin: 0; color: #bae6fd; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">
          &copy; ${currentYear} ${COMPANY_NAME}. ${t.rightsReserved}
        </p>
      </div>
    </div>

  </div>
</body>
</html>
`;
};
