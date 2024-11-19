import cn from 'classnames';
import { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';

const classes = {
  root: 'ps-10 pe-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0',
  normal:
    'bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-accent',
  solid:
    'bg-gray-100 border border-border-100 focus:bg-light focus:border-accent',
  outline: 'border border-border-base focus:border-accent',
  shadow: 'focus:shadow',
};

type SearchProps = {
  className?: string;
  shadow?: boolean;
  title?: string;
  variant?: 'normal' | 'solid' | 'outline';
  inputClassName?: string;
  onSearch: (data: SearchValue) => void;
};

type SearchValue = {
  searchText: string;
};

const Search: React.FC<SearchProps> = ({
  className,
  onSearch,
  title,
  variant = 'outline',
  shadow = false,
  inputClassName,
}) => {
  const [searchText, setSearchText] = useState('');
  // useEffect(() => {
  //   if (!searchText) {
  //     onSearch({ searchText: '' });
  //   }
  // }, [searchText, onSearch]);

  function clear() {
    onSearch({ searchText: '' });
  }

  return (
    <form
      noValidate
      role='search'
      className=' float-right  my-4 relative font-lato'
      onSubmit={(e: any) => {
        e.preventDefault();
        onSearch({ searchText: e.target.search.value });
      }}
    >
      <p className='my-2 font-semibold'>{title ? title : 'Find an order'}</p>
      <button className='outline-none absolute right-4 start-1  text-black focus:outline-none active:outline-none p-2 text-body'>
        <BsSearch className='w-5 h-5' />
      </button>
      <input
        type='text'
        name='searchInput'
        id='search'
        className='py-2 px-4 outline-none  w-300 rounded-md bg-gray-200 border-[1px] border-brand_color text-black'
        placeholder='Search'
        aria-label='Search'
        onChange={(e: any) => {
          onSearch({ searchText: e.target.value });
        }}
      />
    </form>
  );
};

export default Search;
