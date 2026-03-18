interface PreviewProps {
  file: File & { preview: string };
  onRemove?: () => void;
}
