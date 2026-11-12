"use client";
import styles from "./form.module.css";
import Image from "next/image";
import { useOpen } from "@/app/common/providerModal";
import { useState } from "react";

export default function FormBlog({ url, slug }: { url: string; slug: string }) {
  // 1. Estados para controlar o status do formulário
  const [sucess, setSucess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasBackendError, setHasBackendError] = useState(false);
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Tel: "",
    Acting: "",
    Company: "",
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
          company: formData?.Company,
          acting: formData?.Acting,
          tel: formData?.Tel,
          email: formData?.Email,
        }),
      });

      if (response.ok) {
        // Cenário de sucesso
        const responseData = await response.json();
        setSucess(true);

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

  const { setOpen } = useOpen();

  return (
    <div className={styles.mainContentForm}>
      <Image
        src={url || "/blogImage.svg"}
        alt={`${slug} - Artigo Marketing Imobiliário da agência LUZIAC.`}
        width={420}
        height={300}
      ></Image>

      <div className={styles.contentForm}>
        <form
          id="myForm"
          onSubmit={handleSubmit}
          className={styles.FormMain}
          action=""
        >
          <div className={styles.DetailItem}></div>
          <label htmlFor="Name">
            <p>
              Como você <span>gostaria de ser chamado?</span>
            </p>
            <input
              type="text"
              name="Name"
              required={true}
              value={formData.Name}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="Company">
            <p>
              Qual o nome da <span>sua empresa?</span>
            </p>
            <input
              type="text"
              name="Company"
              required={true}
              value={formData.Company}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="Acting">
            <p>
              Qual seu <span>tipo de atuação?</span>
            </p>
            <input
              type="text"
              name="Acting"
              required={true}
              value={formData.Acting}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="Tel">
            <p>
              Seu <span>zap</span> ou <span>telefone</span>:
            </p>
            <input
              type="tel"
              name="Tel"
              placeholder="DDD + Telefone (11 99999 9999)"
              required={true}
              value={formData.Tel}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="Email">
            <p>
              E por último, <span>seu melhor e-mail:</span>
            </p>
            <input
              type="email"
              name="Email"
              required={true}
              value={formData.Email}
              onChange={handleChange}
            />
          </label>
        </form>

        {/* 3. Lógica do botão atualizada */}
        <button
          form="myForm"
          disabled={loading}
          className={styles.submitButton}
          onClick={handleSubmit}
        >
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
              DADOS <span>ENVIADOS!</span>
            </p>
          ) : (
            <p>
              <span>ENVIAR</span> (ESTOU PRONTO <br />
              PARA POTENCIALIZAR <br />
              MINHAS VENDAS.) <span>{" >"}</span>
            </p>
          )}
        </button>
      </div>
    </div>
  );
}
