import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Button from '@material-ui/core/Button';
import { useState } from 'react';

import axios from 'axios';

export default function Home() {
  const [value, setValue] = useState(0);
  const Calculadora = (value1, value2) => {
    return value1 + value2;
  };
  const handleOnClick = async () => {
    let config = {
      method: 'get',
      url: 'https://cors-anywhere.herokuapp.com/http://crefaz.com.br/enel/checa_data.php?dt=2021-03-31&uf=CE',
      headers: {},
      maxRedirects: 0,
    };

    axios(config)
      .then((response) => {
        //  console.log(response.data);

        var el = document.createElement('html');
        el.innerHTML = response.data;

        const aa = el.getElementsByTagName('pre');
        const text = aa[0].textContent;
        console.log(text);

        console.log(
          text,
          Number(
            text.substr(text.search('codProduto') + 'codProduto'.length + 4, 5)
          )
        );

        setValue(
          Number(
            text.substr(text.search('codProduto') + 'codProduto'.length + 4, 5)
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.values}>
              <div className={styles.value}>Valor:</div>

              <div className={styles.value}>{value}</div>
            </div>

            <Button variant="contained" color="primary" onClick={handleOnClick}>
              Hello World
            </Button>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
