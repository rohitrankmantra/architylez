// utils/pdfHelper.js
export const getPdfThumbnail = async (pdfUrl) => {
  if (typeof window === "undefined" || !pdfUrl) return null;

  try {
    const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf");

    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.12.313/pdf.worker.min.js";

    const loadingTask = pdfjsLib.getDocument({ url: pdfUrl });
    const pdf = await loadingTask.promise;

    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1.5 });

    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const context = canvas.getContext("2d");
    if (!context) throw new Error("Cannot get canvas context");

    await page.render({ canvasContext: context, viewport }).promise;

    return canvas.toDataURL();
  } catch (error) {
    console.error("Failed to generate thumbnail:", error);
    return null;
  }
};
