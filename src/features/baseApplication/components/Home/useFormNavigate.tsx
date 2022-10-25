import React from "react";
import { useNavigate } from "react-router-dom";

interface FormElements extends HTMLFormControlsCollection {
  owner: HTMLInputElement;
  repo: HTMLInputElement;
}
const getElements = (form: HTMLFormElement | any) =>
  (form as HTMLFormElement).elements as FormElements;

export function useFormNavigate() {
  const navigate = useNavigate();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const elements = getElements(event.target);
    const owner = elements.owner.value;
    const repo = elements.repo.value;
    const uri = `/${owner}/${repo}`;

    navigate(uri);

    event.preventDefault();
  };
  return onSubmit;
}
