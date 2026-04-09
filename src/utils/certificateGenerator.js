/**
 * Certificate Generator using jsPDF
 * Generates certificates in-browser (no server needed!)
 */

import jsPDF from 'jspdf';

/**
 * Generate a certificate PDF object
 * @param {string} userName - User's full name
 * @param {string} courseCode - Course code (e.g., "c1")
 * @param {Date} completionDate - Date of completion (defaults to today)
 * @returns {jsPDF} PDF document object
 */
export const generateCertificatePDF = (userName, courseCode, completionDate = new Date()) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });
  
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // ═══════════════════════════════════════════════════════════
  // BACKGROUND & BORDER
  // ═══════════════════════════════════════════════════════════
  
  // Light blue background
  doc.setFillColor(240, 248, 255);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  
  // Decorative outer border
  doc.setDrawColor(0, 51, 102);
  doc.setLineWidth(3);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
  
  // Inner decorative border
  doc.setLineWidth(1);
  doc.setDrawColor(100, 150, 200);
  doc.rect(15, 15, pageWidth - 30, pageHeight - 30);
  
  // ═══════════════════════════════════════════════════════════
  // MAIN TITLE
  // ═══════════════════════════════════════════════════════════
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(42);
  doc.setTextColor(0, 51, 102);
  doc.text('Certificate of Completion', pageWidth / 2, 50, { align: 'center' });
  
  // ═══════════════════════════════════════════════════════════
  // SUBTITLE & DECORATIVE LINE
  // ═══════════════════════════════════════════════════════════
  
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(14);
  doc.setTextColor(100, 100, 100);
  doc.text('This is proudly presented to', pageWidth / 2, 75, { align: 'center' });
  
  // Decorative line
  doc.setDrawColor(0, 51, 102);
  doc.setLineWidth(2);
  doc.line(50, 85, pageWidth - 50, 85);
  
  // ═══════════════════════════════════════════════════════════
  // RECIPIENT NAME (PROMINENT)
  // ═══════════════════════════════════════════════════════════
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(36);
  doc.setTextColor(0, 51, 102);
  doc.text(userName, pageWidth / 2, 110, { align: 'center' });
  
  // ═══════════════════════════════════════════════════════════
  // ACHIEVEMENT TEXT
  // ═══════════════════════════════════════════════════════════
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(16);
  doc.setTextColor(50, 50, 50);
  
  doc.text('in recognition of successfully completing the course', pageWidth / 2, 130, { align: 'center' });
  
  // ═══════════════════════════════════════════════════════════
  // COURSE INFORMATION
  // ═══════════════════════════════════════════════════════════
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(0, 51, 102);
  
  const courseDisplayName = getCourseDisplayName(courseCode);
  doc.text(courseDisplayName, pageWidth / 2, 155, { align: 'center' });
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text(`Course Code: ${courseCode.toUpperCase()}`, pageWidth / 2, 168, { align: 'center' });
  
  // ═══════════════════════════════════════════════════════════
  // COMPLETION DATE
  // ═══════════════════════════════════════════════════════════
  
  const formattedDate = completionDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text(`Completed on: ${formattedDate}`, pageWidth / 2, 190, { align: 'center' });
  
  // ═══════════════════════════════════════════════════════════
  // SIGNATURE LINES
  // ═══════════════════════════════════════════════════════════
  
  const signatureLineY = 210;
  const signatureLineLength = 50;
  const leftX = pageWidth / 4;
  const rightX = (3 * pageWidth) / 4;
  
  // Left signature
  doc.setLineWidth(1);
  doc.setDrawColor(0, 0, 0);
  doc.line(leftX - signatureLineLength / 2, signatureLineY, leftX + signatureLineLength / 2, signatureLineY);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(50, 50, 50);
  doc.text('Instructor Signature', leftX, signatureLineY + 10, { align: 'center' });
  
  // Right signature
  doc.line(rightX - signatureLineLength / 2, signatureLineY, rightX + signatureLineLength / 2, signatureLineY);
  doc.text('Director Signature', rightX, signatureLineY + 10, { align: 'center' });
  
  // ═══════════════════════════════════════════════════════════
  // FOOTER
  // ═══════════════════════════════════════════════════════════
  
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(120, 120, 120);
  doc.text('Arambha Learning Management System', pageWidth / 2, pageHeight - 15, { align: 'center' });
  
  return doc;
};

/**
 * Get the display name for a course code
 * @param {string} courseCode - e.g., "c1"
 * @returns {string} Display name
 */
export const getCourseDisplayName = (courseCode) => {
  const courseMap = {
    c1: 'Foundation 60',
    c2: 'Full Stack Java Developer',
    c3: 'Data Science & AI',
    c4: 'Banking & Finance Masterclass',
    c5: 'AutoCAD Design',
    c6: 'Digital Marketing Expert',
    c7: 'Human Resource Management',
    c8: 'Job Ready Bootcamp'
  };
  
  return courseMap[courseCode.toLowerCase()] || `Course ${courseCode.toUpperCase()}`;
};

/**
 * Download certificate as PDF
 * Triggers browser download without saving to server
 * @param {string} userName - User's full name
 * @param {string} courseCode - Course code (e.g., "c1")
 */
export const downloadCertificate = (userName, courseCode) => {
  try {
    const doc = generateCertificatePDF(userName, courseCode);
    const filename = `${userName.replace(/\s+/g, '_')}_${courseCode.toUpperCase()}_certificate.pdf`;
    doc.save(filename);
    console.log('✅ Certificate downloaded:', filename);
  } catch (error) {
    console.error('❌ Error downloading certificate:', error);
    throw error;
  }
};

/**
 * Open certificate in new window for preview
 * @param {string} userName - User's full name
 * @param {string} courseCode - Course code (e.g., "c1")
 */
export const previewCertificate = (userName, courseCode) => {
  try {
    const doc = generateCertificatePDF(userName, courseCode);
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
    console.log('✅ Certificate preview opened');
  } catch (error) {
    console.error('❌ Error previewing certificate:', error);
    throw error;
  }
};

export default {
  generateCertificatePDF,
  getCourseDisplayName,
  downloadCertificate,
  previewCertificate
};
