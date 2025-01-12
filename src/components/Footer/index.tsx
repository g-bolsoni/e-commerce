import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

// import seal_payment from '/';
// import seal_security from '';
// import seal_shipping_correios from '';
// import seal_shipping_jadlog from 'seals/seal_shipping_jadlog.png';
import Image from "next/image";
import { api } from "@/services/api";

const getCategories = async () => {
  const response = await api.get("products/categories");
  return response.data;
};

const Footer = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  return (
    <footer className="bg-white w-full min-h-[400px] py-8 md:py-12">
      <div className="mx-3 md:container md:mx-auto overflow-x-hidden flex flex-col gap-10">
        <div className="flex flex-col gap-6 md:gap-0 md:flex-row justify-between items-start md:px-24">
          <div className="institutional w-full flex flex-col gap-2 md:flex-[1_0_165px]">
            <span className="text-base font-bold text-zinc-900 text-center md:text-left">
              Institucional
            </span>
            <ul className="flex flex-col gap-2 items-center md:items-start">
              <li className="text-base font-normal text-zinc-800">
                Quem Somos
              </li>
              <li className="text-base font-normal text-zinc-800">
                Torca e Devolução
              </li>
              <li className="text-base font-normal text-zinc-800">
                Política de privacidade
              </li>
              <li className="text-base font-normal text-zinc-800">Entrega</li>
            </ul>
          </div>

          <div className="account w-full flex flex-col gap-2 md:flex-[1_0_103px]">
            <span className="text-base font-bold text-zinc-900 text-center md:text-left">
              Minha Conta
            </span>
            <ul className="flex flex-col gap-2 items-center md:items-start">
              <li className="text-base font-normal text-zinc-800">
                Fale Conosco
              </li>
              <li className="text-base font-normal text-zinc-800">
                Meus Dados
              </li>
              <li className="text-base font-normal text-zinc-800">
                Meus Pedidos
              </li>
              <li className="text-base font-normal text-zinc-800">
                Mapa do site
              </li>
            </ul>
          </div>

          <div className="categories w-full flex flex-col gap-2 md:flex-[1_0_120px]">
            <span className="text-base font-bold text-zinc-900 text-center md:text-left">
              Categorias
            </span>
            <ul className="flex flex-col gap-2 items-center md:items-start">
              {isLoading || true ? (
                <p className="text-base text-zinc-800">Carregando ...</p>
              ) : (
                <>
                  {data.map((category: string, index: number) => (
                    <Link
                      key={index}
                      href={`/category/${category}`}
                      className="capitalize text-base font-normal text-zinc-800"
                    >
                      {category}
                    </Link>
                  ))}
                </>
              )}
            </ul>
          </div>

          <div className="customer_service w-full flex flex-col gap-2 md:flex-[1_0_320px]">
            <span className="text-base font-bold text-zinc-900 text-center md:text-left">
              Atendimento ao cliente
            </span>
            <ul className="flex flex-col gap-2 items-center md:items-start ">
              <li className="text-base font-normal text-zinc-800 text-center md:text-left max-w-[350px] md:max-w-full">
                Atendimento de vendas: (16) 99365-8338
              </li>
              <li className="text-base font-normal text-zinc-800 text-center md:text-left max-w-[350px] md:max-w-full">
                Whatsapp: (16) 99365-8338
              </li>
              <li className="text-base font-normal text-zinc-800 text-center md:text-left max-w-[350px] md:max-w-full">
                De segunda a sexta-feira da 8:00 às 13:30 horas e das 14:30 Às
                15:00 horas
              </li>
            </ul>
          </div>

          <div className="social_networks w-full flex flex-col gap-2 md:flex-[1_0_160px]">
            <span className="text-base font-bold text-zinc-900 text-center md:text-left">
              Siga nossas redes
            </span>
            <ul className="flex flex-row gap-2 items-center justify-center md:justify-start">
              {/* Insta */}
              <li className="text-base font-normal text-zinc-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                >
                  <path
                    d="M8.76303 3.04248C5.71094 3.04248 3.22754 5.52734 3.22754 8.5802V16.4893C3.22754 19.5418 5.7124 22.0256 8.76526 22.0256H16.6744C19.7269 22.0256 22.2106 19.5407 22.2106 16.4878V8.57798C22.2106 5.52588 19.7258 3.04248 16.6729 3.04248H8.76303ZM18.414 6.07977C18.8331 6.07977 19.1733 6.41995 19.1733 6.8391C19.1733 7.25824 18.8331 7.59842 18.414 7.59842C17.9949 7.59842 17.6547 7.25824 17.6547 6.8391C17.6547 6.41995 17.9949 6.07977 18.414 6.07977ZM12.7191 7.59842C15.4413 7.59842 17.6547 9.81185 17.6547 12.534C17.6547 15.2562 15.4409 17.4696 12.7191 17.4696C9.9969 17.4696 7.78348 15.2558 7.78348 12.534C7.78348 9.81223 9.9969 7.59842 12.7191 7.59842ZM12.7191 9.11707C10.8318 9.11707 9.30212 10.6467 9.30212 12.534C9.30212 14.4213 10.8318 15.951 12.7191 15.951C14.6064 15.951 16.136 14.4213 16.136 12.534C16.136 10.6467 14.6064 9.11707 12.7191 9.11707Z"
                    fill="#212121"
                  />
                </svg>
              </li>
              {/* Face */}
              <li className="text-base font-normal text-zinc-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="none"
                >
                  <g clipPath="url(#clip0_1_2181)">
                    <path
                      d="M16.8635 12.8984L17.47 8.94761H13.6788V6.38378C13.6788 5.30312 14.2082 4.24907 15.9063 4.24907H17.6296V0.88565C17.6296 0.88565 16.0659 0.618896 14.5705 0.618896C11.4486 0.618896 9.40803 2.51141 9.40803 5.93691V8.9483H5.9375V12.8991H9.40803V22.4504H13.6788V12.8991L16.8635 12.8984Z"
                      fill="#212121"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_2181">
                      <rect
                        width="21.8315"
                        height="21.8315"
                        fill="white"
                        transform="translate(0.868164 0.618164)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </li>
              {/* Youtube */}
              <li className="text-base font-normal text-zinc-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="none"
                >
                  <g clipPath="url(#clip0_1_2183)">
                    <path
                      d="M22.0765 6.53731C21.9528 6.09634 21.712 5.69711 21.3797 5.38206C21.0379 5.05732 20.619 4.82503 20.1626 4.7071C18.4542 4.25683 11.6101 4.25683 11.6101 4.25683C8.75681 4.22437 5.90425 4.36715 3.0685 4.68436C2.61203 4.811 2.19393 5.04848 1.85139 5.37569C1.51482 5.69953 1.27104 6.09886 1.14369 6.5364C0.837767 8.18445 0.68913 9.85783 0.69978 11.534C0.688864 13.2087 0.837137 14.8815 1.14369 16.5316C1.26831 16.9673 1.51118 17.3648 1.84866 17.6859C2.18614 18.007 2.6064 18.239 3.0685 18.3618C4.79955 18.8112 11.6101 18.8112 11.6101 18.8112C14.467 18.8437 17.3232 18.7009 20.1626 18.3836C20.619 18.2657 21.0379 18.0334 21.3797 17.7087C21.7162 17.3876 21.9555 16.9882 22.0755 16.5534C22.3895 14.906 22.5421 13.2319 22.5313 11.5549C22.5549 9.8708 22.4025 8.18883 22.0765 6.5364V6.53731ZM9.4342 14.6486V8.42028L15.1286 11.5349L9.4342 14.6486Z"
                      fill="#212121"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_2183">
                      <rect
                        width="21.8315"
                        height="21.8315"
                        fill="white"
                        transform="translate(0.699707 0.618164)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </li>
              {/* Tik Tok */}
              <li className="text-base font-normal text-zinc-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="19"
                  viewBox="0 0 20 19"
                  fill="none"
                >
                  <g clipPath="url(#clip0_1_2187)">
                    <path
                      d="M10.3986 0.100296C11.4292 0.0843506 12.4538 0.0937999 13.4773 0.0843506C13.5393 1.28973 13.9728 2.51756 14.8552 3.36977C15.7357 4.24325 16.9813 4.64307 18.1931 4.77832V7.94917C17.0574 7.91196 15.9164 7.67573 14.8859 7.18672C14.437 6.98356 14.0189 6.72193 13.6096 6.4544C13.6043 8.75531 13.6191 11.0533 13.5948 13.3447C13.5334 14.4456 13.1702 15.5411 12.53 16.4483C11.5 17.9584 9.71234 18.9429 7.87622 18.9736C6.74997 19.038 5.62491 18.7309 4.66521 18.1651C3.07476 17.2273 1.95561 15.5104 1.7926 13.6678C1.77207 13.2776 1.76892 12.8866 1.78316 12.4961C1.9249 10.9978 2.66608 9.56441 3.81654 8.58936C5.12055 7.45367 6.94723 6.91269 8.65756 7.23279C8.67351 8.39919 8.62685 9.56441 8.62685 10.7308C7.84551 10.4781 6.93246 10.5489 6.24975 11.0232C5.75026 11.3522 5.37279 11.8363 5.17547 12.401C5.01247 12.8002 5.05913 13.2438 5.06858 13.6678C5.25579 14.96 6.49838 16.0461 7.82484 15.9286C8.70422 15.9191 9.54698 15.4088 10.0053 14.6618C10.1535 14.4001 10.3195 14.1326 10.3283 13.8249C10.4057 12.4163 10.375 11.0137 10.3844 9.60517C10.3909 6.43077 10.375 3.26524 10.3992 0.100887L10.3986 0.100296Z"
                      fill="#212121"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_2187">
                      <rect
                        width="18.8987"
                        height="18.8987"
                        fill="white"
                        transform="translate(0.53125 0.0844727)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center md:flex-row md:items-start md:justify-between gap-6 md:gap-0">
          <div className="flex items-center flex-col justify-center">
            <span className="text-base font-bold text-zinc-900 text-center md:text-left">
              Formas de pagamento
            </span>
            <div className="flex gap-4">
              <Image
                src="/seals/seal_payment.png"
                alt="Selo de pagamento"
                width={285}
                height={25}
                priority
              />
            </div>
          </div>

          <div className="flex items-center flex-col justify-center">
            <span className="text-base font-bold text-zinc-900 text-center md:text-left">
              Formas de entrega
            </span>
            <div className="flex gap-4">
              <Image
                src="/seals/seal_shipping_correios.png"
                alt="Selo de forma de entrega"
                width={106}
                height={25}
                priority
              />
              <Image
                src="/seals/seal_shipping_jadlog.png"
                alt="Selo de forma de entrega"
                width={95}
                height={25}
                priority
              />
            </div>
          </div>

          <div className="flex items-center flex-col justify-center">
            <span className="text-base font-bold text-zinc-900 text-center md:text-left">
              Loja segura
            </span>
            <div className="flex gap-4">
              <Image
                src="/seals/seal_security.png"
                alt="Selo de segurança"
                width={65}
                height={25}
                priority
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center flex-col flex-wrap">
          <p className="text-sm text-zinc-500 font-normal text-center max-w-[350px] md:max-w-full ">
            Atendimento Irroba Store 2023. Todos os direitos reservados - Rua
            Nabi Haber, 465 - São José - Franca - AL - CEP: 14401286
          </p>
          <p className="text-sm text-zinc-500 font-normal text-center max-w-[350px] md:max-w-full ">
            Atendimento Irroba Store - CNPJ: 446.512.458-97 / Franca - AL.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
