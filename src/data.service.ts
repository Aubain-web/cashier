import { Injectable } from "@nestjs/common";
import { Category, Product } from "./entities/product.entity";
import { Order } from "./entities/order.entity";
import { Table, TypeTable } from "./entities/table.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Not, Repository } from "typeorm";

const PATH_IMAGE = "/public/img/food/";

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(Table)
    private tablesRepository: Repository<Table>
  ) {
    this.seedProducts();
    this.seedTables();
  }

  /** Public methdods */

  async findAllProducts(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOneProduct(id: number): Promise<Product | null> {
    return this.productsRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findProductsByCategory(idCategory: number): Promise<Product[]> {
    return this.productsRepository.find({
      where: {
        category: idCategory,
      },
    });
  }

  async findAllTables(): Promise<Table[]> {
    return this.tablesRepository.find();
  }

  findOneTable(id: number): Promise<Table | null> {
    return this.tablesRepository.findOne({
      where: {
        id,
      },
    });
  }

  findOneTableByPosition(x: number, y: number): Promise<Table | null> {
    return this.tablesRepository.findOne({
      where: {
        posX: x,
        posY: y,
      },
    });
  }

  async findAllOrders(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  async findAllClosedOrders(): Promise<Order[]> {
    return this.ordersRepository.find({
      where: {
        date_end: Not(IsNull()),
      },
    });
  }

  findOneOrder(id: number): Promise<Order | null> {
    return this.ordersRepository.findOne({
      where: {
        id,
      },
    });
  }

  async saveOrder(order: Order): Promise<Order> {
    console.log("this is called", order.id)
   this.ordersRepository.save(order);
    return order;
  }

  async removeOrder(id: number): Promise<void> {
    this.ordersRepository.delete(id);
  }

  async seedProducts(): Promise<void> {
    // seed products table
    console.log("** Seed products table **");
    const products: Product[] = this.loadDefaultProducts();
    this.productsRepository.save(products);
    console.log("** End Seed products table **");
  }

  async seedTables(): Promise<void> {
    // seed products table
    console.log("** Seed tables table **");
    const tables: Table[] = this.loadDefaultTables();
    this.tablesRepository.save(tables);
    console.log("** End Seed tables table **");
  }

  /** Private methods */
  private loadDefaultTables(): Table[] {
    return [
      new Table(1, TypeTable.rectangle_8, 0, 0),
      new Table(2, TypeTable.square_2, 0, 1),
      new Table(3, TypeTable.square_4, 1, 0),
      new Table(4, TypeTable.square_4, 1, 1),
      new Table(5, TypeTable.round_4, 1, 2),
    ];
  }

  private loadDefaultProducts(): Product[] {
    return [
      // starters
      new Product(
        "Duo de saumon pickles, billes de combava, condiment avocat",
        20.0,
        `${PATH_IMAGE}starter1.jpg`,
        Category.starters
      ),
      new Product(
        "Langoustine en cocktail, chimichurri",
        24.0,
        `${PATH_IMAGE}starter2.jpg`,
        Category.starters
      ),
      new Product(
        "Carpaccio de tomates, moutarde balsamique, légumes confits en pickles",
        14.0,
        `${PATH_IMAGE}starter3.jpg`,
        Category.starters
      ),
      new Product(
        "Bruschetta au maroilles, pickles d’oignon, mesclun acidulé",
        15.0,
        `${PATH_IMAGE}starter4.jpg`,
        Category.starters
      ),
      new Product(
        "Salade César Panko",
        22.0,
        `${PATH_IMAGE}starter5.jpg`,
        Category.starters
      ),
      new Product(
        "Tartine de chèvre rôti, légumes confits, mesclun",
        20.0,
        `${PATH_IMAGE}starter6.jpg`,
        Category.starters
      ),
      new Product(
        "Tartare de boeuf au couteau, frites, salade",
        24.0,
        `${PATH_IMAGE}starter7.jpg`,
        Category.starters
      ),

      // main dishes
      new Product(
        "Burger Gantois",
        23.0,
        `${PATH_IMAGE}dishe1.jpg`,
        Category.dishes
      ),
      new Product(
        "Volaille en croûte de céréales, sauce maroilles, crémeux de carottes, légumes rôtis",
        21.0,
        `${PATH_IMAGE}dishe2.jpg`,
        Category.dishes
      ),
      new Product(
        "Waterzoï de cabillaud, tagliatelles de légumes sautés, émulsion pomme et citron",
        24.0,
        `${PATH_IMAGE}dishe3.jpg`,
        Category.dishes
      ),
      new Product(
        "Risotto de gambas à l’ail, légumes de saison sautés",
        29.0,
        `${PATH_IMAGE}dishe4.jpg`,
        Category.dishes
      ),
      new Product(
        "Filet de bœuf Simmental rôti, mousseline de céleri vanille, légumes glacés, jus corsé	",
        29.0,
        `${PATH_IMAGE}dishe5.jpg`,
        Category.dishes
      ),
      new Product(
        "Potjevleesch, frites et salade",
        21.0,
        `${PATH_IMAGE}dishe6.jpg`,
        Category.dishes
      ),
      new Product(
        "Cromesquis de Crevettes, frites et salade	",
        20.0,
        `${PATH_IMAGE}dishe7.jpg`,
        Category.dishes
      ),
      new Product(
        "Welsh jambon, frites	",
        22.0,
        `${PATH_IMAGE}dishe8.jpg`,
        Category.dishes
      ),
      new Product(
        "Welsh saumon fumé, frites",
        25.0,
        `${PATH_IMAGE}dishe9.jpg`,
        Category.dishes
      ),
      new Product(
        "Carbonnade Flamande, frites",
        20.0,
        `${PATH_IMAGE}dishe10.jpg`,
        Category.dishes
      ),
      new Product(
        "Croque-Monsieur, frites et salade",
        20.0,
        `${PATH_IMAGE}dishe11.jpg`,
        Category.dishes
      ),

      // deserts
      new Product(
        "Tarte citron basilic meringuée",
        10.0,
        `${PATH_IMAGE}desert1.jpg`,
        Category.deserts
      ),
      new Product(
        "Chocolat by Hermitage	",
        10.0,
        `${PATH_IMAGE}desert2.jpg`,
        Category.deserts
      ),
      new Product(
        "Millefeuille vanille, fraises, éclats de pistaches",
        10.0,
        `${PATH_IMAGE}desert3.jpg`,
        Category.deserts
      ),
      new Product(
        "Café gourmand",
        10.5,
        `${PATH_IMAGE}desert4.jpg`,
        Category.deserts
      ),
      new Product(
        "Salade de fruits de saison",
        8.0,
        `${PATH_IMAGE}desert5.jpg`,
        Category.deserts
      ),
      new Product(
        "Pavé Flamand",
        8.0,
        `${PATH_IMAGE}desert6.jpg`,
        Category.deserts
      ),

      // drinks
      new Product("Coca Cola", 4.5, `${PATH_IMAGE}drink1.jpg`, Category.drinks),
      new Product("Coca Zéro", 4.5, `${PATH_IMAGE}drink2.jpg`, Category.drinks),
      new Product("Vittel", 5.8, `${PATH_IMAGE}drink3.jpg`, Category.drinks),
      new Product(
        "San Pelegrino",
        5.8,
        `${PATH_IMAGE}drink4.jpg`,
        Category.drinks
      ),
      new Product("Orangina", 4.5, `${PATH_IMAGE}drink5.jpg`, Category.drinks),
      new Product("Perrier", 4.5, `${PATH_IMAGE}drink6.jpg`, Category.drinks),
      new Product("Limonade", 4.5, `${PATH_IMAGE}drink7.jpg`, Category.drinks),
      new Product("Schweppes", 4.5, `${PATH_IMAGE}drink8.jpg`, Category.drinks),
      new Product(
        "Café allongé",
        3.0,
        `${PATH_IMAGE}drink9.jpg`,
        Category.drinks
      ),
      new Product("Expresso", 3.0, `${PATH_IMAGE}drink10.jpg`, Category.drinks),
      new Product(
        "Capuccino",
        3.0,
        `${PATH_IMAGE}drink11.jpg`,
        Category.drinks
      ),

      //alcool
      new Product(
        "Paix dieu",
        10.0,
        `${PATH_IMAGE}alcool1.jpg`,
        Category.alcools
      ),
      new Product("Duvel", 8.0, `${PATH_IMAGE}alcool2.jpg`, Category.alcools),
      new Product("Chouffe", 7.5, `${PATH_IMAGE}alcool3.jpg`, Category.alcools),
      new Product(
        "Tripel Karmeliet",
        7.5,
        `${PATH_IMAGE}alcool4.jpg`,
        Category.alcools
      ),
      new Product(
        "Rince Cochon",
        7.0,
        `${PATH_IMAGE}alcool5.jpg`,
        Category.alcools
      ),
      new Product(
        "Grimbergen",
        6.0,
        `${PATH_IMAGE}alcool6.jpg`,
        Category.alcools
      ),
      new Product("Leffe", 6.0, `${PATH_IMAGE}alcool7.jpg`, Category.alcools),
      new Product("Cornet", 8.0, `${PATH_IMAGE}alcool8.jpg`, Category.alcools),
      new Product("Corbeau", 8.0, `${PATH_IMAGE}alcool9.jpg`, Category.alcools),
    ];
  }
}
