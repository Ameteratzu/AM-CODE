export default function CheckIcon({
  type = 1,
  size = 24, // tamaño en px
}) {
  // Definir las imágenes según el type
  const urls = {
    1: "/logosContacto/checkmark-circle-outline.png",
    2: "/logosContacto/checkmark-circle-outline (1).png"
  };

  // Si el type no existe, usa un fallback
  const url_check = urls[type] || urls[1];

  return (
    <img
      src={url_check}
      alt="icon"
      style={{ width: size, height: size }}
    />
  );
}
