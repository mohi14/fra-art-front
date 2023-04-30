import React from "react";

const Pagination = ({ members, amount, setPage, page }) => {
  const previousBtn = () => {
    setPage(page - 1);
  };
  const nextBtn = () => {
    pages.length - 1 !== page && setPage(page + 1);
  };
  let pages = [];
  for (let i = 0; i <= Math.ceil(members / amount); i++) {
    pages.push(i);
  }

  return (
		<div className='mt-4'>
			<div className='btn-fix col-12 d-flex flex-row justify-content-center align-items-center'>
				<button
					style={{ opacity: page === 1 && "0" }}
					className='
          btn btn-outline-dark me-3'
					onClick={previousBtn}
					type=''
					disabled={page === 1 && true}>
					«
				</button>
				{pages.map((index, pageItem) =>
					pageItem > 0 ? (
						<button
							style={{ border: page === pageItem && "bg-light" }}
							className='
              btn btn-outline-dark me-4'
							onClick={() => setPage(pageItem)}
							key={index}
							type=''>
							{pageItem}
						</button>
					) : (
						""
					)
				)}
				<button
					style={{ opacity: page === pages.length - 1 && "0" }}
					className='
          btn btn-outline-dark
           me-4'
					onClick={nextBtn}
					type=''
					disabled={page === pages.length - 1 && true}>
					»
				</button>
			</div>
		</div>
	);
};

export default Pagination;
