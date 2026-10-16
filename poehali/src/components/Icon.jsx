import icons from "./icon-data.json";
// Vector paths captured from the original rendered website.
export function Icon({ name, size = 24, className = "", ...props }) {
  const icon = icons[name];
  if (!icon) throw new Error("Missing source icon: " + name);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={icon.viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={icon.class + " " + className}
      {...props}
      dangerouslySetInnerHTML={{ __html: icon.content }}
    />
  );
}
