import { upload } from "./actions";

export default function Page() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form className="space-y-4">
        <div>
          <input
            id="caption"
            name="caption"
            required
            type="text"
            className="input input-bordered w-full"
            placeholder="caption"
          />
        </div>

        <button className="btn btn-primary btn-block" formAction={upload}>
          アップロード
        </button>
      </form>
    </div>
  );
}
