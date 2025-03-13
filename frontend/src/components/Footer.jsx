import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#2C6E49",
        color: "white",
        padding: "40px 0",
        borderTop: "2px solid #1F5233",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "32px",
        }}
      >
        {/* Logo & Description */}
        <div>
          <img
            src="https://via.placeholder.com/150x50.png?text=BookStore+Logo"
            alt="BookStore Logo"
            style={{ height: "56px", width: "auto" }}
          />
          <p style={{ fontSize: "14px", marginTop: "12px" }}>
            Your one-stop destination for the best books and literary experiences.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", color: "#A7D7C5" }}>
            Quick Links
          </h3>
          <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
            {["Home", "About Us", "Shop", "Contact"].map((item, index) => (
              <li key={index} style={{ marginBottom: "8px" }}>
                <a
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  style={{
                    color: "white",
                    textDecoration: "none",
                    transition: "color 0.3s",
                  }}
                  onMouseOver={(e) => (e.target.style.color = "#A7D7C5")}
                  onMouseOut={(e) => (e.target.style.color = "white")}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", color: "#A7D7C5" }}>
            Contact Us
          </h3>
          <ul style={{ listStyle: "none", padding: "0", margin: "0", fontSize: "14px" }}>
            <li>Email: support@bookstore.com</li>
            <li>Phone: +1 (123) 456-7890</li>
            <li>Address: 123 Book Street, Library City</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", color: "#A7D7C5" }}>
            Follow Us
          </h3>
          <div style={{ display: "flex", gap: "20px", fontSize: "24px" }}>
            {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, index) => (
              <a
                key={index}
                href="#"
                style={{
                  color: "white",
                  transition: "color 0.3s",
                }}
                onMouseOver={(e) => (e.target.style.color = "#A7D7C5")}
                onMouseOut={(e) => (e.target.style.color = "white")}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div
        style={{
          textAlign: "center",
          fontSize: "14px",
          color: "#A7D7C5",
          marginTop: "40px",
        }}
      >
        &copy; {new Date().getFullYear()} BookStore. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
