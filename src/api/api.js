import axios from 'axios';
import { encode } from 'base-64';

const WooCommerceConfig = {
    baseUrl: 'https://saptham.com/wp-json/wc/v3/',
    consumerKey: 'ck_fa0d1a75d18c461013617791a3bf94107164c9f4',
    consumerSecret: 'cs_32da0609c3c3b2b68578ffe2011014675693001c',
    basicAuth: 'Basic ' + encode(`ck_fa0d1a75d18c461013617791a3bf94107164c9f4:cs_32da0609c3c3b2b68578ffe2011014675693001c`),
  };

  


export const WooCommerceAPI = axios.create({
  baseURL: WooCommerceConfig.baseUrl,
  headers: {
    "Authorization": WooCommerceConfig.basicAuth,
  },
});