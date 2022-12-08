import { Strapi } from '@strapi/strapi';
import products from './products';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  async register({ strapi }: { strapi: Strapi }) {
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Strapi }) {
    if (process.env.BOOTSTRAP) {
      const { name, max, min, price, category, options, imageSrc } = products[0];
      const uploads = await strapi.entityService.findMany('plugin::upload.file');

      const fileNameToId = Object.fromEntries(uploads.map(({ name, id }) => [name, id]));

      await strapi.entityService.create(
        'api::product.product', {
        data: {
          name,
          media: fileNameToId[imageSrc],
          price,
          min,
          max,
          category,
          options
        }
      }
      )
    }
  },
};
