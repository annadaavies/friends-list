/**
 * For the best practice, this model.ts file only contain the description
 * or schemas(professional term) of the database (here is an array).
 */
export interface Friend {
  id: number;
  name: string;
  sex: string;
  age: number;
  description: string;
}

/**
 * DTO should be collected in a speific folder called dto inside a module folder.
 * Remember, when we run a script: {nest g module friend} in mac terminal, to create a module.
 * Nest CLI automatically create a module folder containing the friend.module.ts under src folder.
 * Then, we create a friend.dto.ts inside a dto folder,
 * and that dto folder should be placed in module folder.
 */

/**
 * REMEMBER: a TS/JS variable, class or function name is declared with camelCase.
 */
export interface FriendDto {
  id: number;
  name: string;
  sex: string;
  age: number;
  description: string;
}

/**
 * friendSearchOptions should be a dto, right? If so, the var name should end with "Dto".
 */
export interface friendSearchOptions {
  id?: string;
  name?: string;
  sex?: string;
  age?: string;
}

/**
 * IMPORTANT:
 * Actually, you need to npm install two packages to define a DTO for doing a validation of
 * a request body. These two packages are class-validator and class-transformer.
 * And using a class to define a dto instead of a interface because interfaces disappear
 * during compilation, as it’s native to TypeScript and doesn't exist in JavaScript.
 *
 * You can refer this website to define your dto:
 * https://dev.to/davidekete/understanding-data-transfer-objects-dto-and-data-validation-in-typescript-nestjs-1j2b
 *
 * For now, you dont have a real DB, so you can just see the the part of writing a user-auth schema
 * in above article as a reference only.
 */
