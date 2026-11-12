"use client";

import styles from "./modalLead.module.css";
import { useEffect, useState } from "react";
import { useOpen } from "./providerModal";

export default function ModalLead() {
  const { open, setOpen } = useOpen();
  const [render, setRender] = useState<boolean>(false);

  useEffect(() => {
    if (open === "whatsapp") {
      setRender(true);
    } else {
      setRender(false);
    }
  }, [open]);

  function setClose() {
    setOpen("false");
  }

  // 1. Estados para controlar o status do formulário
  const [sucess, setSucess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasBackendError, setHasBackendError] = useState(false); // Adicionado
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Tel: "",
  });

  // 2. Função de envio atualizada
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Reseta os estados de sucesso/erro e ativa o loading
    setLoading(true);
    setSucess(false);
    setHasBackendError(false);

    try {
      const response = await fetch("/pages/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData?.Name,
          company: "sua base de contatos",
          acting: "Contato via modal do site",
          tel: formData?.Tel,
          email: formData?.Email,
        }),
      });

      if (response.ok) {
        // Cenário de sucesso
        const responseData = await response.json();
        setSucess(true);
        console.log(responseData);
        window.open(
          "https://wa.me/551191496-5650?text=Oii!%20Vi%20o%20site%20da%20Luziac%20e%20quero%20potencializar%20minhas%20vendas%20com%20Marketing%20Imobili%C3%A1rio,%20pode%20me%20ajudar?%22",
          "_blank"
        );
      } else {
        // Cenário de erro do backend
        console.error(
          "Erro na solicitação:",
          response.status,
          response.statusText
        );
        setHasBackendError(true);
      }
    } catch (error) {
      // Cenário de erro de rede/conexão
      console.error("Erro na solicitação:", error);
      setHasBackendError(true);
    } finally {
      // Desativa o loading ao final, independentemente do resultado
      setLoading(false);
    }
  };

  const phoneMask = (phone: string): string => {
    let cleaned = String(phone || "").replace(/\D/g, "");

    if (
      (cleaned.length === 12 || cleaned.length === 13) &&
      cleaned.startsWith("55")
    ) {
      cleaned = cleaned.substring(2);
    }
    cleaned = cleaned.slice(0, 11);

    if (cleaned.length > 2) {
      const ddd = cleaned.substring(0, 2);
      const number = cleaned.substring(2);
      return `${ddd} ${number}`;
    }

    return cleaned;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    if (name === "Tel") {
      value = phoneMask(value);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (!render) {
    return null;
  }

  return (
    <>
      <section className={styles.main}>
        <div className={styles.container}>
          <div className={styles.modal}>
            <p className={styles.Close} onClick={setClose}>
              <strong>X</strong>
            </p>
            <h1>
              CONVERSE VIA{" "}
              <span>
                <br />
                WHATSAPP
              </span>
            </h1>

            <form onSubmit={handleSubmit}>
              <label htmlFor="Name">
                <p>Como você gostaria de ser chamado?</p>
                <input
                  type="text"
                  required={true}
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="Tel">
                <p>Seu zap ou telefone:</p>
                <input
                  type="tel"
                  required={true}
                  name="Tel"
                  value={formData.Tel}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="Email">
                <p>E por último, seu melhor e-mail:</p>
                <input
                  type="email"
                  required={true}
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                />
              </label>
              <br />

              {/* 3. Lógica do botão atualizada */}
              <button className={styles.mainButton} disabled={loading}>
                {loading ? (
                  <p>
                    ENVIANDO <span>...</span>
                  </p>
                ) : hasBackendError ? (
                  <p>
                    ERRO, <span>TENTE NOVAMENTE</span>
                  </p>
                ) : sucess ? (
                  <p>
                    CONTATO <span>ENVIADO!</span>
                  </p>
                ) : (
                  <p>
                    INICIAR <span>CONVERSA</span>
                    {" >"}
                  </p>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
