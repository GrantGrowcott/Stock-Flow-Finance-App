import Image from "next/image";
const FavoriteStock = () => {
  return (
    <button className="flex items-center justify-start gap-4  mt-3 p-3 rounded-2xl hover:bg-[var(--white)] dark:hover:bg-[var(--darkGrey)]">
      <h3 className="text-lg">Add to Watch list</h3>
      <Image src="/plus.png" alt="Add to Watch list" width={48} height={48} />
    </button>
  );
};

export default FavoriteStock;
