"use client";
import Link from "next/link";
import styles from "./footer.module.css";
import Image from "next/image";

import { Parallax } from "react-scroll-parallax";
import { useState } from "react";
import { useOpen } from "./providerModal";

export default function Footer() {
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSucess(false);
    setHasBackendError(false);
    sucess && null;
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
        setSucess(true);
        window.open(
          "https://wa.me/551191496-5650?text=Oii!%20Vi%20o%20site%20da%20Luziac%20e%20quero%20potencializar%20minhas%20vendas%20com%20Marketing%20Imobili%C3%A1rio,%20pode%20me%20ajudar?%22",
          "_blank"
        );
      } else {
        console.error(
          "Erro na solicitação:",
          response.status,
          response.statusText
        );
        setHasBackendError(true);
      }
    } catch (error) {
      console.error("Erro na solicitação:", error);
      setHasBackendError(true);
    } finally {
      setLoading(false);
    }
  };

  const phoneMask = (phone: string): string => {
    // 1. Garante que o valor de entrada é uma string e remove tudo que não for dígito.
    let cleaned = String(phone || "").replace(/\D/g, "");

    // 2. Se o número limpo tem 12 ou 13 dígitos e começa com 55, remove o código do país.
    if (
      (cleaned.length === 12 || cleaned.length === 13) &&
      cleaned.startsWith("55")
    ) {
      cleaned = cleaned.substring(2);
    }

    // 3. NOVO: Limita o total de dígitos para 11 (DDD + Celular).
    // Isso garante que o número não exceda o tamanho máximo de um celular brasileiro.
    cleaned = cleaned.slice(0, 11);

    // 4. Adiciona o espaço após o DDD (os dois primeiros dígitos).
    if (cleaned.length > 2) {
      const ddd = cleaned.substring(0, 2);
      const number = cleaned.substring(2);
      return `${ddd} ${number}`;
    }

    // 5. Se o número for muito curto, retorna apenas os números limpos.
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
    <>
      <footer id={"CONTATO"} className={styles.Main}>
        <div className={styles.Container}>
          <div className={styles.contentContact}>
            <h6>
              <Image
                width={35}
                height={35}
                src={"/footerDarkLogo.svg"}
                alt="Luziac marketing imobiliário - Logo dark"
              ></Image>{" "}
              LUZIAC <br /> MARKETING <br /> <span>IMOBILIÁRIO</span>
            </h6>
            <p className={styles.contentContactDesc}>
              O mercado imobiliário está mudando,
              <br />
              e se você não mudar junto, fica pra trás.
              <br />*
              <span>
                Vem com a gente e potencialize suas <br />
                vendas através do digital!
              </span>
              *
            </p>
            <div
              className={styles.whatsappButton}
              onClick={() => setOpen("whatsapp")}
            >
              <p>
                <Image
                  src="/footerWhatsapp.svg"
                  width={25}
                  height={25}
                  alt="Whatsapp de contato para marketing imobiliário - Luziac. "
                ></Image>{" "}
                CHAMA A GENTE NO <span>&nbsp;ZAP</span>
              </p>
            </div>

            <br />
            <Link href="mailto:Guilherme@luziac.com.br" target="_blank">
              <div className={styles.emailButton}>
                <p>
                  <Image
                    src="/emailFooter.svg"
                    width={25}
                    height={25}
                    alt="Email de contato para marketing imobiliário - Luziac. "
                  ></Image>
                  ENVIE UM <span>&nbsp;E-MAIL</span>
                </p>
              </div>
            </Link>
            <p className={styles.convertItemDesc}>
              Ou então, preencha seus <br /> dados e *
              <span>nós te chamamos</span>*
              <Image
                className={styles.arrowIcon}
                width={70}
                height={20}
                alt={"Contatos da Luziac."}
                src="/arrowFooter.svg"
              ></Image>
            </p>
          </div>
          <div className={styles.contentForm}>
            <form
              id="myForm"
              onSubmit={handleSubmit}
              className={styles.FormMain}
              action=""
            >
              <label htmlFor="Name">
                <p>
                  Como você <span>gostaria de ser chamado?</span>
                </p>
                <input
                  type="text"
                  name="Name"
                  value={formData.Name}
                  required={true}
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
                  value={formData.Company}
                  required={true}
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
                  value={formData.Acting}
                  required={true}
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
                  value={formData.Tel}
                  placeholder="DDD + Telefone (11 99999 9999)"
                  required={true}
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
            <button
              form="myForm"
              disabled={loading}
              className={styles.submitButton}
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
                  CONTATO <span>ENVIADO!</span>
                </p>
              ) : (
                <p>
                  INICIAR <span>CONVERSA</span>
                  {" >"}
                </p>
              )}
            </button>
            <Parallax speed={8} startScroll={8} style={{ zIndex: 2 }}>
              <Image
                className={styles.footerTel}
                src={"/tellParallaxFooter.svg"}
                width={320}
                height={320}
                alt={"Telefone de contato da LUZIAC"}
              ></Image>
            </Parallax>
          </div>
        </div>
        <div className={styles.lastItem}>
          <Link href="/">
            <Image
              src="/mainLogo.png"
              alt="Luziac - Criando Conexões - Logo"
              width={420}
              height={80}
            ></Image>
          </Link>
        </div>
      </footer>
    </>
  );
}
