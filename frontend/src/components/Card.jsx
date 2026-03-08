export default function Card({
  children,
  title,
  subtitle,
  className = "",
}) {
  return (
    <div
      className={`bg-white/90 backdrop-blur-md rounded-2xl 
                  border border-gray-200 
                  shadow-sm hover:shadow-lg 
                  transition-all duration-300 
                  p-6 ${className}`}
    >
      {/* Header Section (Optional) */}
      {title && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 tracking-tight">
            {title}
          </h3>

          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">
              {subtitle}
            </p>
          )}

          {/* Subtle divider */}
          <div className="mt-4 h-px bg-gray-100" />
        </div>
      )}

      {children}
    </div>
  );
}