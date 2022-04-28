import { <%= classify(name) %>Entity } from '../../../../entities';
import { <%= classify(name) %>Dto } from '../../../../note-factory/shared';

export class <%= classify(name) %>Mapper {
  async entityToDTO(input: <%= classify(name) %>Entity): Promise<<%= classify(name) %>Dto> {
    return {
      uuid: input.uuid,
      name: input.name,
      title: '',
    };
  }

  async entitiesToDTOs(
    input: Array<<%= classify(name) %>Entity>,
  ): Promise<Array<<%= classify(name) %>Dto>> {
    const result: Array<<%= classify(name) %>Dto> = [];

    for (const entity of input) {
      result.push(await this.entityToDTO(entity));
    }

    return result;
  }
}
