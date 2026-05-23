import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini Client helper
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key.includes("MY_GEMINI_API_KEY") || key.trim() === "") {
      throw new Error("GEMINI_API_KEY environment variable is not configured.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// AI Advisor & Compliance Router
app.post("/api/ai/analyze", async (req, res) => {
  const { prompt, category, contextData } = req.body;
  
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    const client = getGeminiClient();
    
    // We construct a specific context system instruction based on categories
    let systemInstruction = "You are the MediIntel AI Compliance Advisor. You provide highly authoritative, professional answers concerning hospital automation, NABH guidelines, CGHS/ECHS medical empanelment procedures, CGHS billing, statutory regulations, medical gas licenses, fire safety NOC, TPA coordination, and clinical intelligence dashboard design. Provide answers with clean markdown headings, bullet points, checklists, and summary points.";

    if (category === "sop") {
      systemInstruction += " Your task is to draft a compliant, extremely detailed Standard Operating Procedure (SOP) standard for hospitals aiming for NABH accreditation. Structure it logically with Scope, Responsibility, Procedure, Key Performance Indicators (KPI), and Audit checkpoints.";
    } else if (category === "compliance") {
      systemInstruction += " Your task is to audit and assess the user's checklist or concerns against real-world NABH 5th/6th edition hospital certification standards. Highlight physical hazards, quality checkpoints, documentation gap analysis, and corrective actions.";
    } else if (category === "empanelment") {
      systemInstruction += " Your task is to explain and write operational draft letters, request compliance matrices, and checklists for CGHS/ECHS/TPA health insurance empanelment. Provide exactly what documents are needed and structure a sample letter.";
    }

    const promptMessage = `User Request: ${prompt}\n\nHospital Segment Context: ${contextData || "General Hospital Operations"}\n\nPlease generate a professional, startup-ready structured solution:`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptMessage,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return res.json({ result: response.text });
  } catch (error: any) {
    console.error("Gemini Endpoint Error:", error);
    
    // Fallback Mock responses for premium preview if key is unconfigured or fails
    const mockResponses: Record<string, string> = {
      sop: `### Standard Operating Procedure: Biomedical Waste Management & Nursing Infection Control
**Accreditation Level**: NABH 5th Edition Standard HIC (Hospital Infection Control)
**Document Reference**: MISPL-SOP-HIC-04

#### 1. Purpose & Scope
This SOP defines the guidelines for segregating, labeling, storing, and safely transporting biomedical waste to minimize infectious exposure among nursing staffs, visitors, and waste handlers. It applies all clinical departments, ICUs, OTs, and diagnostic laboratories of the hospital.

#### 2. Responsibilities
- **Infection Control Officer / Doctor**: Overall monitoring and quarterly training.
- **Infection Control Nurse (ICN)**: Daily surveillance of correct waste segregation at source.
- **Nursing Staff / Ward Incharge**: Adherence to the color-coded dustbins collection guidelines.

#### 3. Step-by-Step Procedure
1.  **Segregation at Source (The Color-Coded Coding Formula)**:
    *   **Yellow Bags (Infectious, Anatomical waste)**: Human tissues, organs, blood-soaked swabs, clinical culture dressings, cotton rolls.
    *   **Red Bags (Contaminated Recyclable plastics)**: IV bottles, urine bags, syringes without needles, catheters, gloves, tubes.
    *   **Blue Boxes (Glassware)**: Broken glass/ampoules & metallic implants. No sharps!
    *   **White Puncture-Proof Container (Sharp waste)**: Used needles, surgical blades, scalpels, lancets, syringes with fixed needles.
2.  **Mutilation Protocol**:
    *   Syringes must be mutilated with a hub cutter immediately upon clinical use.
3.  **Labeling & Storage**:
    *   All containers must carry the international Biohazard emblem.
    *   Clinical waste bags must never be filled beyond 3/4 capacity.
    *   Clinical waste storage duration must not exceed 48 hours within the hospital holding yard.

#### 4. Monitoring Audit Matrix
| Audit Indicator | Target Benchmark | Frequency | Audit Responsibility |
| :--- | :--- | :--- | :--- |
| Hand Hygiene Compliance | > 95% | Monthly | Infection Control Nurse |
| Correct Bin Segregation Rate | 100% | Daily Random Check | Nursing Ward In-charge |
| Sharp-injury Incidence Reporting | 0 cases | Post-incident / 24 hrs | Quality Department Officer |

*Note: This report was generated automatically via MediIntel's preset system because the secure Gemini secret key is not configured in the developer workspace. To unlock production live AI generation, configure your GEMINI_API_KEY under Settings > Secrets.*`,
      compliance: `### MediIntel Healthcare Audit: Fire Safety NOC & Medical Gases Statutory Gap Analysis

Below is an automated regulatory compliance gap report based on Indian healthcare statutory norms and the NABH FMS (Facility Management and Safety) guidelines:

#### 1. Fire Safety NOC Readiness Audits
*   **Identified Gap**: Many hospital wings struggle to maintain a valid, active Fire Safe NOC certificate. Under state rules, quarterly mock-drills are mandatory but poorly logged.
*   **MediIntel Analytics Advice**: 
    1.  Ensure clear escape route map layouts at every 20-meter passage distance in all regional languages plus English.
    2.  Install fire sprinklers, gas-suppression systems in IT server rooms and diagnostic critical infrastructure (MRI/CT).
    3.  Automate dynamic reminders within the MediIntel SaaS dashboard exactly 90 days prior to the Fire NOC certificate expiration.

#### 2. Medical Gas Pipeline System (MGPS) Compliance (NABH FMS.5)
*   **Visual Controls**: All copper piping handles must be clearly color-coded according to gas types (e.g., Oxygen as Black band/White shoulder, Nitrous Oxide as Blue).
*   **Dual Storage Reservoirs**: Liquid oxygen vacuum insulated evaporator (VIE) cylinders require an auxiliary manifold backup cylinder system running concurrently with auto-switchover systems.
*   **Alert Automation**: Automatic differential pressure sensors must report telemetry directly to the ICU nurse station panels.

*Note: This report was generated automatically via MediIntel's preset system because the secure Gemini secret key is not configured in the developer workspace. To unlock production live AI generation, configure your GEMINI_API_KEY under Settings > Secrets.*`,
      empanelment: `### Empanelment Compliance Matrix: CGHS & Private TPA Document Checklist
**Target Class**: Multi-Speciality Tertiary Care Hospital Accreditation
**Department Focus**: Insurance, billing, and corporate empanelment desk

#### 1. Core Mandate Document Dossier
To successfully qualify for CGHS (Central Government Health Scheme) or premier TPAs (Star Health, ICICI Lombard, HDFC Ergo), the hospital must compile the following active credentials:
1.  **Valid NABH / NABL Accreditation Certificate** — Yields maximum package pricing rates (Entry level or Full Accreditation).
2.  **Up-to-date Bio-Medical Waste Authorization** — Issued by the State Pollution Control Board.
3.  **Fire Safety NOC Clearance** — Validated by the Municipal Authority.
4.  **Registered Pharmacist NOC & Drug License** — For the in-hospital pharmacy stores.
5.  **Clinical Establishment Act (CEA) Registration** — Or nursing home license issued by the local health officer.

#### 2. Process Optimization & Claim Scrubbing Guidelines
*   **Claim Rejection Safeguards**: Pre-authorization requests must include diagnostic justification (CT/MRI reports, clinical history sheet detailing duration of distress, vitals chart) directly supporting the diagnosis code (ICD-10).
*   **Discharge Automation**: Consolidate discharge clinical summaries electronically. MediIntel's AI engine automatically translates unstructured ward charts into tidy billing-scrubbed records, preventing common insurer deduction triggers (e.g., "duplicate nursing charges" or "undocumented disposable costs").

*Note: This report was generated automatically via MediIntel's preset system because the secure Gemini secret key is not configured in the developer workspace. To unlock production live AI generation, configure your GEMINI_API_KEY under Settings > Secrets.*`,
      custom: `### MediIntel Health-Tech Consultation
**Subject**: Hospital Quality Optimization with Artificial Intelligence

To optimize your specific healthcare group, we recommend deploying our modular dashboard integration:
1.  **NABH Chapter Tracker**: Replaces binders with real-time checklists that track patient safety indicators (PSIs).
2.  **Smart Statutory Organogram**: Reminds your medical superintendent of upcoming NOC renewals (Fire, Lift, Medical Gases).
3.  **Revenue Cycle Claim Scrubbing**: Decreases payment delays from premium Insurance TPAs from 45 days down to 14 days by scanning clinical documentation for compliance before discharge.

*Note: This response was generated via MediIntel's preset system. To unlock customized production AI generation, configure your GEMINI_API_KEY under Settings > Secrets.*`
    };

    const selectedMock = mockResponses[category] || mockResponses.custom;
    return res.json({ 
      result: selectedMock, 
      isDemo: true,
      message: "Please add your GEMINI_API_KEY in Settings > Secrets to unlock live, customized AI models." 
    });
  }
});

// Vite middleware flow for full stack
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[MediServer] Running full stack server on http://localhost:${PORT}`);
  });
}

startServer();
