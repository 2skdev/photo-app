import { register } from "./actions";

export default function Page() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form className="space-y-4">
        <div>
          <label className="input input-bordered flex items-center gap-2">
            @
            <input
              id="account_name"
              name="account_name"
              required
              type="text"
              className="w-full"
              placeholder="アカウント名"
            />
          </label>
        </div>

        <div>
          <input
            id="display_name"
            name="display_name"
            required
            type="text"
            className="input input-bordered w-full"
            placeholder="名前"
          />
        </div>

        <button className="btn btn-primary btn-block" formAction={register}>
          登録
        </button>
      </form>
    </div>
  );
}
