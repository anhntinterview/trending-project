import {
  getRandomFloat,
  getRandomIntFromInterval,
  getSimpleRandom,
  getRandomParagraph,
  getRandomAddress,
  getRandomPhoneNumber,
  generatePassword,
  getRandomEmail,
  getRandomPostalCode
} from '@/ultilize/random';
import { AppDataSource } from '../../../data-source';
import { Product } from '@db/entity/product.entity';
import { Tag } from '@db/entity/tag.entity';
import { Customer } from '@db/entity/customer.entity';
import { CustomerAddress } from '@db/entity/customer-address.entity';
import { cityName, countryList, nameList } from '@/ultilize/const';
import { TableA, TableB, TableC } from '@db/entity/test.entity';
import { CustomerSession } from '@db/entity/customer-session.entity';

export const CustomerSessionGen = async () => {
  // const record = await AppDataSource.manager.findOne(CustomerSession, {
  //   where: {
  //     id: '8195fefa-3ca1-4e02-9c24-bc01bbb6cecc'
  //   }
  // })
  // await AppDataSource.manager.remove(record);
  // ---
  const customer = await AppDataSource.manager.findOne(Customer, {
    where: { id : '09d47117-bf73-4cb3-86ff-68fdfba05091'}
  })
  const customerSession = new CustomerSession();
  const timer = 3600;
  const currentTime = new Date();
  const expiredDate = new Date(currentTime.getTime() + timer * 1000);
  if(customer) {
    customerSession.value = JSON.stringify({
      customerId: '09d47117-bf73-4cb3-86ff-68fdfba05091',
      maxAge: timer,
      currentTime,
      expiredDate
    });
    // customerSession.customer = customer
    await AppDataSource.manager.save(customerSession);
  } else {
    console.log(`customer was not defined`);
  }
  
};

export const TestGen2 = async () => {
  const tableC1 = new TableC();
  const tableC2 = new TableC();
  const tableA = new TableA();

  tableA.name = 'tableAC';
  tableC1.name = 'tableC1A';
  tableC2.name = 'tableC2A';

  tableC1.tableA = tableA;
  tableC2.tableA = tableA

  tableA.tableCs = [tableC1, tableC2];

  await AppDataSource.manager.save(tableA);
  await AppDataSource.manager.save(tableC1);
  await AppDataSource.manager.save(tableC2);

  console.log(`==============`, await AppDataSource.manager.find(TableA, { relations: ['tableCs'] }));
  console.log(`==============`, await AppDataSource.manager.find(TableC, { relations: ['tableA'] }));
};

export const TestGen = async () => {
  const tableB = new TableB();
  const tableA = new TableA();

  tableA.name = 'tableA3';
  tableB.name = 'tableB2';

  tableB.tableAs = [tableA];
  tableA.tableBs = [tableB];

  await AppDataSource.manager.save(tableA);
  await AppDataSource.manager.save(tableB);

  console.log(`==============`, await AppDataSource.manager.find(TableA, { relations: ['tableBs'] }));
  console.log(`==============`, await AppDataSource.manager.find(TableB, { relations: ['tableAs'] }));
};

export const ProductTag = async () => {
  for (let i = 0; i < 10; i++) {
    const tag = new Tag();
    tag.tag_name = getRandomParagraph(['entertaiment', 'tech', 'ecommercial', 'ai', 'crypto', 'bigdata']);
    tag.icon = `Icon ${i + 1}`;
    tag.created_at = new Date();
    tag.updated_at = new Date();
    tag.estimate_days = i + 1;

    const product = new Product();
    product.product_name = `Product Name ${i + 1}`;
    product.sku = `SKU123${i}`;
    product.regular_price = getRandomFloat(9.99, 39.9, 2);
    product.discount_price = getRandomFloat(9.99, 39.9, 2);
    product.quantity = getRandomIntFromInterval(1, 100);
    product.short_description = getRandomParagraph([
      'MARKETSJOURNAL REPORTS: WEALTH MANAGEMENT',
      'A Professor Spent Years Helping His Mother. Now He Needs to Figure Out His Finances.',
      'A financial adviser weighs in on when he can afford to stop teaching.'
    ]);
    product.product_description = getRandomParagraph([
      'TECH',
      'The Elon Musk Doctrine: How the Billionaire Navigates the World Stage',
      'The entrepreneur is outspoken on U.S. issues but often more deferential globally.'
    ]);
    product.product_weight = getRandomFloat(0.1, 29.9, 2);
    product.product_note = 'Product note';
    product.publisher = true;
    product.created_at = new Date();
    product.updated_at = new Date();

    await AppDataSource.manager.save(product);
    await AppDataSource.manager.save(tag);

    console.log('Loading products from the database...');
    const products = await AppDataSource.manager.find(Product);
    console.log('Loaded products: ', products);
  }
};

export const CustomerCustomerAddress = async () => {
  for (let i = 0; i < 10; i++) {
    const customer = new Customer();
    customer.first_name = getSimpleRandom(nameList);
    customer.last_name = getSimpleRandom(nameList);
    customer.email = getRandomEmail();
    customer.active = true;
    customer.phone_number = getRandomPhoneNumber();
    customer.created_at = new Date();
    customer.updated_at = new Date();

    const customerAddress = new CustomerAddress();
    customerAddress.address_line1 = getRandomAddress();
    customerAddress.address_line2 = getRandomAddress();
    customerAddress.postal_code = getRandomPostalCode();
    customerAddress.city = getSimpleRandom(cityName);
    customerAddress.country = getSimpleRandom(countryList);
    customerAddress.phone_number = getRandomPhoneNumber();
    customerAddress.created_at = new Date();
    customerAddress.updated_at = new Date();

    await AppDataSource.manager.save(customer);
    await AppDataSource.manager.save(customerAddress);

    console.log('Loading customers from the database...');
    const customers = await AppDataSource.manager.find(Customer);
    console.log('Loaded customers: ', customers);
  }
};

AppDataSource.initialize()
  .then(async () => {
    // await ProductTag();
    // await CustomerCustomerAddress();
    // await TestGen();
    await TestGen2();
  })
  .catch((error) => console.log(error));
