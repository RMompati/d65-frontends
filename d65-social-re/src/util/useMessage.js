import {useState} from "react";

export const useMessage = () => {
  const [feedbackMessage, setFeedbackMessage] = useState("");

  return [feedbackMessage, setFeedbackMessage]
}