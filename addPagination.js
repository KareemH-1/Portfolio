export function addPagination({containerSelector, itemSelector, items, renderItem, itemsPerPage = 6, paginationClass = 'pagination'}) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    let currentPage = 1;
    let filteredItems = [...items];

    let paginationWrapper = container.parentElement.querySelector(`.${paginationClass}-wrapper`);
    if (!paginationWrapper) {
        paginationWrapper = document.createElement('div');
        paginationWrapper.className = `${paginationClass}-wrapper`;
        container.parentElement.insertBefore(paginationWrapper, container.nextSibling);
    }

    if (!document.getElementById('pagination-fade-style')) {
        const style = document.createElement('style');
        style.id = 'pagination-fade-style';
        style.innerHTML = `
            .pagination-fade {
                opacity: 0;
                transition: opacity 0.3s;
            }
            .pagination-fade.show {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }

    function renderPage(page) {
        container.classList.remove('show');
        container.classList.add('pagination-fade');
        
        setTimeout(() => {
            container.innerHTML = '';
            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            
            filteredItems.slice(start, end).forEach(item => {
                container.appendChild(renderItem(item));
            });
            
            const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
            
            if (filteredItems.length > itemsPerPage) {
                renderPagination(page, totalPages);
            } else {
                paginationWrapper.innerHTML = '';
            }
            
            container.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            setTimeout(() => {
                container.classList.add('show');
            }, 10);
        }, 150);
    }

    function renderPagination(page, totalPages) {
        paginationWrapper.innerHTML = '';
        
        const paginationBar = document.createElement('div');
        paginationBar.className = paginationClass;
        
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.className = 'pagination-btn' + (i === page ? ' active' : '');
            btn.addEventListener('click', () => {
                if (currentPage !== i) {
                    currentPage = i;
                    renderPage(currentPage);
                }
            });
            paginationBar.appendChild(btn);
        }
        
        paginationWrapper.appendChild(paginationBar);
    }

    function updateFilter(filterFn) {
        filteredItems = items.filter(filterFn);
        currentPage = 1;
        renderPage(currentPage);
    }

    container.classList.add('pagination-fade');
    setTimeout(() => {
        container.classList.add('show');
    }, 10);
    
    renderPage(currentPage);

    return { updateFilter };
}