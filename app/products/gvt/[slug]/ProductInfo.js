export default function ProductInfo({ product }) {
  const usageOptions = [
    { label: "Residential" },
    { label: "Commercial Building" },
    { label: "Hotel, Restaurant & Cafe" },
    { label: "Gymnasium" },
    { label: "Hospital" },
    { label: "Airport" },
    { label: "School & College" },
    { label: "Industry" },
    { label: "Hall & Corridor" },
    { label: "Mall & Super Market" },
    { label: "Spa and Wellness Centres" },
    { label: "Religious Place" },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">{product.title}</h2>

      {/* Specifications */}
      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-6">Specification</h3>
        <div className="rounded-2xl overflow-hidden border border-black/20 bg-white shadow-md">
          <div className="grid grid-cols-2 gap-6 p-6 text-sm text-gray-700">
            <div className="font-medium">Size (mm)</div>
            <div>{Array.isArray(product.size) ? product.size.join(", ") : product.size ?? "-"}</div>

            {/* filter size and the material type commented used in the future  */}
            
            {/* <div className="font-medium">Filter Size (feet)</div> */}
            {/* <div>{Array.isArray(product.filterSize) ? product.filterSize.join(", ") : product.filterSize ?? "-"}</div> */}
            {/* <div className="font-medium">Material Type</div> */}
            {/* <div>{product.materialType ?? "-"}</div> */}
            <div className="font-medium">Finish</div>
            <div>{Array.isArray(product.finish) ? product.finish.join(", ") : product.finish ?? "-"}</div>
            <div className="font-medium">Application</div>
            <div>{Array.isArray(product.application) ? product.application.join(", ") : product.application ?? "-"}</div>
            <div className="font-medium">Brand</div>
            <div>{product.brand ?? "-"}</div>
            <div className="font-medium">Quality</div>
            <div>{product.quality ?? "-"}</div>
            <div className="font-medium">Coverage Area (sq. ft)</div>
            <div>{product.coverageArea ?? "-"}</div>
            <div className="font-medium">No of pcs in box</div>
            <div>{product.pcsPerBox ?? "-"}</div>
          </div>
        </div>
      </section>
{/* Applications */}
<section className="mb-12">
  <h3 className="text-xl font-semibold mb-6">Application</h3>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
    {(Array.isArray(product.application) && product.application.length > 0
      ? product.application
      : usageOptions
    ).map((app, idx) => (
      <div
        key={idx}
        className="flex flex-col items-center justify-center gap-2 p-4 border border-black/20 rounded-lg shadow text-center text-sm bg-white"
      >
        <span>{app.label || app}</span>
      </div>
    ))}
  </div>
</section>


      {/* Description */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Description</h3>
        <p className="text-base leading-relaxed text-gray-800">
          {product.description ?? "No description available."}
        </p>
      </section>
    </div>
  );
}
