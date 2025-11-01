import React, { useEffect, useState } from "react";
import "./Documentation.css";
import { jsPDF } from "jspdf"; // ✅ import jsPDF

const mockDocumentation = {
  country: "India",
  last_updated: "2025-10-28",
  overview:
    "Import procedures in India are governed by the Customs Act, 1962 and Foreign Trade Policy. Importers must ensure compliance with licensing, classification, and duty regulations.",
  steps: [
    {
      step_no: 1,
      title: "Pre-shipment checks & licensing",
      objective:
        "Ensure the product is allowed for import and all necessary licenses are obtained.",
      who: "Importer / DGFT",
      actions: [
        "Check product restrictions under the Foreign Trade Policy",
        "Apply for an import license via DGFT portal if required",
      ],
      required_documents: [
        "Import License",
        "Business Registration Certificate",
      ],
      timeline: "3–7 business days",
      fees: "Varies by product category",
      official_links: ["https://www.dgft.gov.in"],
      notes:
        "Certain products require special clearances (e.g., electronics, defense items).",
    },
    {
      step_no: 2,
      title: "Customs clearance & duty payment",
      objective: "Clear goods through Indian Customs and pay applicable duties.",
      who: "Importer / Customs Broker / CBIC",
      actions: [
        "File Bill of Entry on ICEGATE portal",
        "Pay customs duty and taxes online",
        "Submit documents for inspection if flagged",
      ],
      required_documents: [
        "Commercial Invoice",
        "Packing List",
        "Bill of Lading",
        "Certificate of Origin",
      ],
      timeline: "1–3 business days",
      fees: "Based on product HS code and declared value",
      official_links: ["https://www.icegate.gov.in"],
      notes: "Ensure HS code classification accuracy to avoid penalties.",
    },
  ],
  authorities: [
    {
      name: "Central Board of Indirect Taxes and Customs (CBIC)",
      url: "https://www.cbic.gov.in",
      contact: "support@cbic.gov.in",
    },
    {
      name: "Directorate General of Foreign Trade (DGFT)",
      url: "https://www.dgft.gov.in",
      contact: "help-dgft@gov.in",
    },
  ],
};

export default function Documentation() {
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [data, setData] = useState(mockDocumentation);
  const [loading, setLoading] = useState(false);
  const [openStep, setOpenStep] = useState(null);

  useEffect(() => {
    setLoading(true);
    // Simulate fetching from backend
    setTimeout(() => {
      setData(mockDocumentation);
      setLoading(false);
    }, 1000);
  }, [selectedCountry]);

  // ✅ Download PDF function
  const downloadChecklist = () => {
    const docPDF = new jsPDF();
    docPDF.setFontSize(16);
    docPDF.text(`Documentation Checklist - ${data.country}`, 20, 20);

    let y = 30;

    // Add steps and documents
    data.steps.forEach((step) => {
      docPDF.setFontSize(12);
      docPDF.text(`Step ${step.step_no}: ${step.title}`, 20, y);
      y += 8;

      step.required_documents.forEach((docItem) => {
        docPDF.text(`- ${docItem}`, 25, y);
        y += 6;
      });

      y += 6; // spacing between steps

      // Add new page if content exceeds page height
      if (y > 270) {
        docPDF.addPage();
        y = 20;
      }
    });

    // Save PDF
    docPDF.save(`Checklist_${data.country}.pdf`);
  };

  return (
    <div className="doc-container">
      <div className="doc-card">
        <div className="doc-header">
          <h2>Documentation — {data.country}</h2>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="doc-select"
          >
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="Germany">Germany</option>
          </select>
        </div>

        {loading ? (
          <div className="doc-loading">Loading documentation...</div>
        ) : (
          <>
            <p className="doc-overview">{data.overview}</p>
            <p className="doc-update">Last updated: {data.last_updated}</p>

            <div className="doc-steps">
              {data.steps.map((step) => (
                <div key={step.step_no} className="doc-step">
                  <div
                    className="doc-step-title"
                    onClick={() =>
                      setOpenStep(openStep === step.step_no ? null : step.step_no)
                    }
                  >
                    Step {step.step_no}: {step.title}
                    <span className="doc-arrow">
                      {openStep === step.step_no ? "▲" : "▼"}
                    </span>
                  </div>

                  {openStep === step.step_no && (
                    <div className="doc-step-content">
                      <p>
                        <strong>Objective:</strong> {step.objective}
                      </p>
                      <p>
                        <strong>Who:</strong> {step.who}
                      </p>
                      <p>
                        <strong>Actions:</strong>
                      </p>
                      <ul>
                        {step.actions.map((a, i) => (
                          <li key={i}>{a}</li>
                        ))}
                      </ul>
                      <p>
                        <strong>Required Documents:</strong>
                      </p>
                      <ul>
                        {step.required_documents.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                      <p>
                        <strong>Timeline:</strong> {step.timeline}
                      </p>
                      <p>
                        <strong>Fees:</strong> {step.fees}
                      </p>
                      <p>
                        <strong>Official Links:</strong>
                      </p>
                      <ul>
                        {step.official_links.map((l, i) => (
                          <li key={i}>
                            <a href={l} target="_blank" rel="noopener noreferrer">
                              {l}
                            </a>
                          </li>
                        ))}
                      </ul>
                      <p>
                        <strong>Notes:</strong> {step.notes}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="doc-authorities">
              <h3>Authorities & Contacts</h3>
              <ul>
                {data.authorities.map((a, i) => (
                  <li key={i}>
                    <strong>{a.name}</strong> —{" "}
                    <a href={a.url} target="_blank" rel="noopener noreferrer">
                      {a.url}
                    </a>
                    <div className="doc-contact">{a.contact}</div>
                  </li>
                ))}
              </ul>
            </div>

            {/* ✅ Updated Download Button */}
            <div className="doc-btn-container">
              <button className="doc-btn" onClick={downloadChecklist}>
                Download Checklist
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
