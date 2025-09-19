import type { User } from "@/types/user";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:3001/users", () => {
    const users: User[] = [
      { id: 1, username: "john_doe" },
      { id: 2, username: "jane_smith" },
      { id: 3, username: "bob_johnson" },
      { id: 4, username: "alice_brown" },
      { id: 5, username: "charlie_davis" },
    ];
    return HttpResponse.json(users);
  }),
];
