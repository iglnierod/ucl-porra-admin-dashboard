interface MenuItemProps {
  value: string;
}

export function MenuItem({ value }: MenuItemProps) {
  return (
    <span className="text-lg cursor-pointer p-2 rounded-md hover:bg-slate-700">
      {value}
    </span>
  );
}
