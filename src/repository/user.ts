import { getDatabaseInstance } from "../database";
import { Database } from "bun:sqlite";
import { User } from "../entity/user";
import { isPasswordCorrect, convertToDatabaseKey } from "../utils";

const usersDbTable: string = "user";

export function deleteUser(userId: number): Boolean {
  if (userId < 0) {
    return false;
  }

  getDatabaseInstance()
		.query(`DELETE FROM ${usersDbTable} WHERE id = ?`)
    .get(userId);

  return true;
}

export function updateUser(userId: number, newValues: object): Boolean {
  const dataBaseInstance: Database = getDatabaseInstance();

	for (const [key, value] of Object.entries(newValues)) {
    if (key !== "id") {
      const databaseKey: string = convertToDatabaseKey(key);

			dataBaseInstance.query(
				`UPDATE ${usersDbTable} SET ${databaseKey} = ? WHERE id = ?`
			).run(value, userId);
		}
  }

  return true;
}

export async function getUser(password: string, userId: string): Promise<User | null> {
  const repositoryUser: { first_name: string, last_name: string, email: string, password: string } | null = getDatabaseInstance()
		.query(`SELECT * FROM ${usersDbTable} WHERE id = ?`)
    .get(userId);

  if (repositoryUser == null) return null;

  const user: User = new User(repositoryUser?.first_name, repositoryUser?.last_name, repositoryUser?.email)

  user.setHashPassword(repositoryUser.password);

  const currentHashedPassword: string = user.getPassword() || "";

  if (await isPasswordCorrect(password, currentHashedPassword)) {
    return user;
  }
}

export function addUser(newUser: User): Boolean {
  getDatabaseInstance()
		.query(`INSERT INTO ${usersDbTable} (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`)
		.run(newUser.getFirstName(), newUser.getLastName(), newUser.getEmail(), newUser.getPassword());

  return true;
}
