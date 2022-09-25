import { Model } from 'mongoose';
import { FindDto } from 'src/validations/find.dto';

export interface data {
  data: any[];
  meta: {
    filter: {};
    pagination: {
      page: number;
      pageSize: number;
    };
    populate: string | string[];
    sort: string;
    total: number;
  };
}

export default async function find(
  model: Model<any>,
  readDto: FindDto,
): Promise<data> {
  const data = await model
    .find(readDto.filter)
    .populate(readDto.populate)
    .sort(readDto.sort)
    .skip(readDto.pagination.pageSize * (readDto.pagination.page - 1))
    .limit(readDto.pagination.pageSize);

  const total: number = await model.countDocuments(readDto.filter);

  return {
    data,
    meta: {
      filter: readDto.filter,
      pagination: readDto.pagination,
      populate: readDto.populate,
      sort: readDto.sort,
      total,
    },
  };
}
