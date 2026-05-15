import { Injectable } from '@angular/core';
import { supabase } from '../supabase.client';

@Injectable({
  providedIn: 'root',
})
export class SpeseService {
  getSpese() {
    return supabase.from('spese').select('*').order('created_at', { ascending: false });
  }

  addSpesa(spesa: { importo: number; descrizione: string; data: Date; categoria_id: number }) {
    return supabase.from('spese').insert([spesa]);
  }

  deleteSpesa(id: string) {
    return supabase.from('spese').delete().eq('id', id);
  }

  async getTotalsByCategory(fromDate?: string) {
    let query = supabase.from('spese').select(`
      categoria_id,
      importo,
      categorie (
        id,
        nome,
        colore
      )
    `);

    if (fromDate) {
      query = query.gte('data', fromDate);
    }

    const { data, error } = await query;

    if (error) {
      return {
        data: [],
        error,
      };
    }

    const grouped = (data || []).reduce<
      Record<
        string,
        {
          id?: string;
          nome: string;
          colore?: string;
          total: number;
        }
      >
    >((acc, item: any) => {
      const category = item.categorie;

      if (!category) {
        return acc;
      }

      if (!acc[category.id]) {
        acc[category.id] = {
          id: category.id,
          nome: category.nome,
          colore: category.colore,
          total: 0,
        };
      }

      acc[category.id].total += Number(item.importo);

      return acc;
    }, {});

    return {
      data: Object.values(grouped),
      error: null,
    };
  }

  async getTotalsByTipo(fromDate?: string) {
    let query = supabase.from('spese').select(`
      importo,
      categorie (
        nome
      )
    `);

    if (fromDate) {
      query = query.gte('data', fromDate);
    }

    const { data, error } = await query;

    if (error) {
      return {
        data: { entrate: 0, spese: 0 },
        error,
      };
    }

    const totals = (data || []).reduce(
      (acc, item: any) => {
        const categoryName = item.categorie?.nome || '';
        const isEntrata = categoryName.toLowerCase() === 'stipendio';

        if (isEntrata) {
          acc.entrate += Number(item.importo);
        } else {
          acc.spese += Number(item.importo);
        }

        return acc;
      },
      { entrate: 0, spese: 0 }
    );

    return {
      data: totals,
      error: null,
    };
  }

  async getTotalsByCategoryBetweenDates(fromDate: string, toDate: string) {
    let query = supabase
      .from('spese')
      .select(
        `
      categoria_id,
      importo,
      categorie (
        id,
        nome,
        colore
      )
    `,
      )
      .gte('data', fromDate)
      .lt('data', toDate);

    const { data, error } = await query;

    if (error) {
      return {
        data: [],
        error,
      };
    }

    const grouped = (data || []).reduce<
      Record<
        string,
        {
          id?: string;
          nome: string;
          colore?: string;
          total: number;
        }
      >
    >((acc, item: any) => {
      const category = item.categorie;

      if (!category) {
        return acc;
      }

      if (!acc[category.id]) {
        acc[category.id] = {
          id: category.id,
          nome: category.nome,
          colore: category.colore,
          total: 0,
        };
      }

      acc[category.id].total += Number(item.importo);

      return acc;
    }, {});

    return {
      data: Object.values(grouped),
      error: null,
    };
  }

  async getExpensesTrend(fromDate?: string) {
    let query = supabase.from('spese').select(`
      data,
      importo,
      categorie (
        nome
      )
    `).order('data', {
      ascending: true,
    });

    if (fromDate) {
      query = query.gte('data', fromDate);
    }

    const { data, error } = await query;

    if (error) {
      return {
        data: [],
        error,
      };
    }

    const grouped = (data || []).reduce<
      Record<
        string,
        {
          date: string;
          entrate: number;
          spese: number;
        }
      >
    >((acc, item: any) => {
      const date = item.data;
      const categoryName = item.categorie?.nome || '';
      const isEntrata = categoryName.toLowerCase() === 'stipendio';

      if (!acc[date]) {
        acc[date] = {
          date,
          entrate: 0,
          spese: 0,
        };
      }

      if (isEntrata) {
        acc[date].entrate += Number(item.importo);
      } else {
        acc[date].spese += Number(item.importo);
      }

      return acc;
    }, {});

    return {
      data: Object.values(grouped),
      error: null,
    };
  }
}
