import { UserSearchHistory } from 'src/domain/user_search_history/entities/user_search_history.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export class UserSearchHistorySeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(UserSearchHistory);

    const searchHistories = [
      // User 1
      { id: 1, search_query: 'La Chicorée', userId: 1 },
      { id: 2, search_query: 'brasserie traditionnelle', userId: 1 },
      { id: 3, search_query: 'plats français', userId: 1 },

      // User 2
      { id: 4, search_query: 'Le Barbier qui Fume', userId: 2 },
      { id: 5, search_query: 'viandes fumées', userId: 2 },
      { id: 6, search_query: 'grillées', userId: 2 },

      // User 3
      { id: 7, search_query: 'L’Gaiette', userId: 3 },
      { id: 8, search_query: 'cuisine régionale', userId: 3 },
      { id: 9, search_query: 'carbonnade', userId: 3 },

      // User 4
      { id: 10, search_query: 'Le Compostelle', userId: 4 },
      { id: 11, search_query: 'cuisine raffinée', userId: 4 },
      { id: 12, search_query: 'Vieux-Lille', userId: 4 },

      // User 5
      { id: 13, search_query: 'N’Autre Monde', userId: 5 },
      { id: 14, search_query: 'cuisine créative', userId: 5 },
      { id: 15, search_query: 'influences internationales', userId: 5 },

      // User 6
      { id: 16, search_query: 'Au Vieux de la Vieille', userId: 6 },
      { id: 17, search_query: 'estaminet', userId: 6 },
      { id: 18, search_query: 'potjevleesch', userId: 6 },

      // User 7
      { id: 19, search_query: 'La Table du Clarance', userId: 7 },
      { id: 20, search_query: 'gastronomique', userId: 7 },
      { id: 21, search_query: 'produits locaux', userId: 7 },

      // User 8
      { id: 22, search_query: 'Le Barbue d’Anvers', userId: 8 },
      { id: 23, search_query: 'cuisine française', userId: 8 },
      { id: 24, search_query: 'rustique', userId: 8 },

      // User 9
      { id: 25, search_query: 'Jour de Pêche', userId: 9 },
      { id: 26, search_query: 'poissons', userId: 9 },
      { id: 27, search_query: 'fruits de mer', userId: 9 },

      // User 10
      { id: 28, search_query: 'L’Arc', userId: 10 },
      { id: 29, search_query: 'cuisine contemporaine', userId: 10 },
      { id: 30, search_query: 'Grand Palais', userId: 10 },
    ];

    for (const searchHistoryData of searchHistories) {
      const searchHistory = new UserSearchHistory();
      searchHistory.id = searchHistoryData.id;
      searchHistory.search_query = searchHistoryData.search_query;
      searchHistory.userId = searchHistoryData.userId;

      await repo.save(searchHistory);
    }

    console.log('All user search history inserted or updated successfully!');
  }
}