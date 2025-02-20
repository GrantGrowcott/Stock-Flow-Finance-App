import Logout from "./components/Logout";
export default async function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div>This will be the home page of the application</div>
      <Logout />
    </div>
  );
}
