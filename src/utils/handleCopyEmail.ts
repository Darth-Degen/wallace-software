import toast from "react-hot-toast";

export const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("wallace@wallace.software");
      toast.success("Email copied to clipboard!");
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = "wallace@wallace.software";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      toast.success("Email copied to clipboard!");
    }
  };