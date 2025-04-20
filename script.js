document.addEventListener('DOMContentLoaded', function() {
    // 検索機能
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');

    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                // 実際のサイトでは検索結果ページへリダイレクトする
                alert('検索キーワード: ' + query);
                // location.href = 'search.html?q=' + encodeURIComponent(query);
            } else {
                alert('検索キーワードを入力してください');
            }
        });

        // エンターキーでも検索できるようにする
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }

    // エリアボタンと特徴ボタンのリンク
    const areaButton = document.querySelector('.btn-area');
    const schoolButton = document.querySelector('.btn-school');

    if (areaButton) {
        areaButton.addEventListener('click', function(e) {
            e.preventDefault();
            // 実際のサイトではエリア検索ページへ遷移
            location.href = '#area-search-section';
        });
    }

    if (schoolButton) {
        schoolButton.addEventListener('click', function(e) {
            e.preventDefault();
            // 実際のサイトでは特徴検索ページへ遷移
            location.href = '#support-section';
        });
    }

    // ナビゲーションのホバーエフェクト
    const navItems = document.querySelectorAll('.global-nav a');
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#3498db';
        });
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });

    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href').length > 1) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // ヘッダー分の高さを引く
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // トップへ戻るボタン
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    scrollToTopButton.className = 'scroll-to-top';
    scrollToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: rgba(41, 128, 185, 0.7);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;
    document.body.appendChild(scrollToTopButton);

    // スクロール位置に応じてボタンの表示・非表示
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopButton.style.display = 'flex';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });

    // クリックでトップへスクロール
    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // モバイルメニュー機能
    const menuButton = document.querySelector('.user-nav a:last-child');
    const globalNav = document.querySelector('.global-nav ul');

    if (menuButton && globalNav) {
        menuButton.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            
            if (globalNav.classList.contains('show-mobile-menu')) {
                globalNav.classList.remove('show-mobile-menu');
                // メニューを閉じるアニメーション
                globalNav.style.maxHeight = '0';
                
                setTimeout(() => {
                    globalNav.style.display = '';
                }, 300); // アニメーション時間
            } else {
                // メニューを開くアニメーション
                globalNav.classList.add('show-mobile-menu');
                globalNav.style.display = 'flex';
                globalNav.style.maxHeight = '0';
                
                setTimeout(() => {
                    globalNav.style.maxHeight = globalNav.scrollHeight + 'px';
                }, 10); // レンダリング後に高さを設定
            }
        });
    }

    // エリア検索のアコーディオン（モバイル用）
    const areaTitles = document.querySelectorAll('.area-title');
    
    areaTitles.forEach(title => {
        title.addEventListener('click', function() {
            const list = this.nextElementSibling;
            this.classList.toggle('active');
            
            if (list.style.maxHeight) {
                list.style.maxHeight = null;
            } else {
                list.style.maxHeight = list.scrollHeight + 'px';
            }
        });
        
        // 初期状態では閉じておく
        const list = title.nextElementSibling;
        list.style.maxHeight = null;
        list.style.overflow = 'hidden';
        list.style.transition = 'max-height 0.3s ease-out';
    });

    // 画像をタップしたときの処理（モバイル）
    const interviewItems = document.querySelectorAll('.interview-item');
    
    interviewItems.forEach(item => {
        item.addEventListener('click', function() {
            // ここでモーダルウィンドウを表示するなどの処理
            this.classList.toggle('highlighted');
        });
    });

    // バナーのホバーエフェクト
    const specialBanners = document.querySelectorAll('.special-banner');
    
    specialBanners.forEach(banner => {
        banner.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
        });
        
        banner.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });

    // レスポンシブ対応 - 画面サイズ変更時の処理
    window.addEventListener('resize', function() {
        // モバイルメニューの状態をリセット
        if (window.innerWidth > 767 && globalNav) {
            globalNav.classList.remove('show-mobile-menu');
            globalNav.style.maxHeight = '';
            globalNav.style.display = '';
        }
    });

    // 学校検索ページの機能
    // 学校検索ページの要素を取得
    const searchForm = document.querySelector('.search-form');
    const stationInput = document.querySelector('.station-input');
    const optionButtons = document.querySelectorAll('.option-button');

    // 駅名の入力サジェスト機能
    if (stationInput) {
        stationInput.addEventListener('input', function() {
            // 実際の実装では、APIを使って駅名のサジェスト候補を表示する
            console.log('駅名入力:', stationInput.value);
        });
    }
    
    // オプションボタンのトグル
    if (optionButtons.length > 0) {
        optionButtons.forEach(button => {
            button.addEventListener('click', function() {
                button.classList.toggle('active');
                // アクティブなスタイルを適用
                if (button.classList.contains('active')) {
                    button.style.backgroundColor = '#e8f5e9';
                    button.style.borderColor = '#4CAF50';
                } else {
                    button.style.backgroundColor = '#f5f5f5';
                    button.style.borderColor = '#ddd';
                }
            });
        });
    }
    
    // 検索フォームの送信処理
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォームデータの収集
            const formData = new FormData(searchForm);
            let searchParams = {};
            
            for (let [key, value] of formData.entries()) {
                searchParams[key] = value;
            }
            
            // アクティブなオプションボタンの値も追加
            const activeOptions = document.querySelectorAll('.option-button.active');
            if (activeOptions.length > 0) {
                searchParams.options = Array.from(activeOptions).map(opt => opt.dataset.option);
            }
            
            console.log('検索パラメータ:', searchParams);
            
            // 実際の実装では、検索結果ページへリダイレクトする
            // window.location.href = '/search-results.html?q=' + encodeURIComponent(JSON.stringify(searchParams));

            // デモ用: 検索ボタンのスタイルを変更して検索中を表示
            const searchButtonElement = document.querySelector('.search-button');
            if (searchButtonElement) {
                searchButtonElement.textContent = '検索中...';
                searchButtonElement.style.backgroundColor = '#2e7d32';
                
                // 検索完了後のシミュレーション
                setTimeout(() => {
                    searchButtonElement.textContent = '検索する';
                    searchButtonElement.style.backgroundColor = '#388e3c';
                    alert('検索機能はデモのため、実際の検索結果は表示されません。');
                }, 1500);
            }
        });
    }
    
    // 偏差値の範囲選択処理
    const deviationMin = document.querySelector('.deviation-min');
    const deviationMax = document.querySelector('.deviation-max');
    
    if (deviationMin && deviationMax) {
        // 最小値と最大値の関連付け
        deviationMin.addEventListener('change', function() {
            const minVal = parseInt(deviationMin.value);
            const maxVal = parseInt(deviationMax.value);
            
            if (minVal > maxVal) {
                deviationMax.value = minVal;
            }
        });
        
        deviationMax.addEventListener('change', function() {
            const minVal = parseInt(deviationMin.value);
            const maxVal = parseInt(deviationMax.value);
            
            if (maxVal < minVal) {
                deviationMin.value = maxVal;
            }
        });
    }
    
    // クリアボタンの処理
    const clearButton = document.querySelector('.clear-button');
    if (clearButton) {
        clearButton.addEventListener('click', function() {
            // 全てのフォーム要素をリセット
            if (searchForm) {
                searchForm.reset();
            }
            
            // アクティブなオプションボタンのリセット
            if (optionButtons.length > 0) {
                optionButtons.forEach(button => {
                    button.classList.remove('active');
                    button.style.backgroundColor = '#f5f5f5';
                    button.style.borderColor = '#ddd';
                });
            }
        });
    }
    
    // 対応エリアの表示
    const areaExpandButton = document.querySelector('.area-expand-button');
    const areaList = document.querySelector('.search-area-list');
    
    if (areaExpandButton && areaList) {
        areaExpandButton.addEventListener('click', function() {
            if (areaList.style.maxHeight) {
                areaList.style.maxHeight = null;
                areaExpandButton.textContent = '対応エリアを表示';
            } else {
                areaList.style.maxHeight = areaList.scrollHeight + 'px';
                areaExpandButton.textContent = '閉じる';
            }
        });
    }

    // 学校詳細ページの機能
    // ハンバーガーメニューの動作
    const menuToggle = document.getElementById('menuToggle');
    const detailGlobalNav = document.getElementById('globalNav');
    
    if (menuToggle && detailGlobalNav) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            detailGlobalNav.classList.toggle('active');
        });
    }
    
    // スムーススクロール
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    if (smoothScrollLinks.length > 0) {
        smoothScrollLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.getAttribute('href').length > 1) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        // ヘッダーの高さを考慮
                        const headerHeight = document.querySelector('.detail-header').offsetHeight;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        // クローズメニュー (モバイル)
                        if (detailGlobalNav && detailGlobalNav.classList.contains('active')) {
                            detailGlobalNav.classList.remove('active');
                        }
                    }
                }
            });
        });
    }
    
    // 生徒の声スライダー
    const voiceSlider = document.querySelector('.voice-slider');
    const voiceItems = document.querySelectorAll('.voice-item');
    const dots = document.querySelectorAll('.dot');
    
    if (voiceSlider && voiceItems.length > 0 && dots.length > 0) {
        let currentSlide = 0;
        
        // 初期状態では最初のスライドのみ表示
        hideAllSlides();
        voiceItems[0].style.display = 'flex';
        
        // ドットをクリックしたら対応するスライドを表示
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                hideAllSlides();
                voiceItems[index].style.display = 'flex';
                updateActiveDot(index);
                currentSlide = index;
            });
        });
        
        // 自動スライド切り替え
        setInterval(() => {
            currentSlide = (currentSlide + 1) % voiceItems.length;
            hideAllSlides();
            voiceItems[currentSlide].style.display = 'flex';
            updateActiveDot(currentSlide);
        }, 5000);
        
        function hideAllSlides() {
            voiceItems.forEach(item => {
                item.style.display = 'none';
            });
        }
        
        function updateActiveDot(index) {
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            dots[index].classList.add('active');
        }
    }
    
    // スクロール時のヘッダーアニメーション
    const detailHeader = document.querySelector('.detail-header');
    
    if (detailHeader) {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 50) {
                // 下にスクロール
                detailHeader.style.transform = 'translateY(-100%)';
            } else {
                // 上にスクロール
                detailHeader.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // CTAボタンのホバーエフェクト
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#e65100';
            this.style.transform = 'translateY(-2px)';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#ff6f00';
            this.style.transform = 'translateY(0)';
        });
    }
    
    // 画像の遅延読み込み
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.removeAttribute('data-src');
                    observer.unobserve(image);
                }
            });
        });
        
        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    }

    // 学校詳細ページのタブ切り替え機能
    const tabLinks = document.querySelectorAll('.tab-nav a');
    const tabItems = document.querySelectorAll('section[id]');
    
    if (tabLinks.length > 0 && tabItems.length > 0) {
        tabLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // タブのアクティブ状態を更新
                document.querySelectorAll('.tab-nav li').forEach(item => {
                    item.classList.remove('active');
                });
                this.parentElement.classList.add('active');
                
                // 対応するセクションにスクロール
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const tabHeight = document.querySelector('.school-tab-section').offsetHeight;
                    const scrollPosition = targetSection.offsetTop - headerHeight - tabHeight;
                    
                    window.scrollTo({
                        top: scrollPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // 学校詳細ページのスライダー機能
    const sliderDots = document.querySelectorAll('.slider-dots .dot');
    const sliderItems = document.querySelectorAll('.voice-slider .voice-item');
    
    if (sliderDots.length > 0 && sliderItems.length > 0) {
        // ドットをクリックしたときの処理
        sliderDots.forEach(dot => {
            dot.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                showSlide(index);
            });
        });
        
        // 指定したスライドを表示する関数
        function showSlide(index) {
            // すべてのスライドを非表示
            sliderItems.forEach(item => {
                item.classList.remove('active');
            });
            
            // すべてのドットを非アクティブ
            sliderDots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // 選択したスライドとドットをアクティブ
            sliderItems[index].classList.add('active');
            sliderDots[index].classList.add('active');
        }
        
        // 自動スライド切り替え
        let slideIndex = 0;
        
        function autoSlide() {
            slideIndex++;
            if (slideIndex >= sliderItems.length) {
                slideIndex = 0;
            }
            showSlide(slideIndex);
        }
        
        // 5秒ごとに自動で切り替え
        setInterval(autoSlide, 5000);
    }
    
    // 学校詳細ページのメニューボタン
    const schoolDetailMenuButton = document.querySelector('.menu-button');
    const schoolDetailGlobalNav = document.querySelector('.detail-header .global-nav');
    
    if (schoolDetailMenuButton && schoolDetailGlobalNav) {
        schoolDetailMenuButton.addEventListener('click', function() {
            schoolDetailGlobalNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // スマホ表示の最適化
    if (window.innerWidth <= 600) {
        // 画面の高さに合わせてビューポートを調整
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        
        // リサイズ時に再計算
        window.addEventListener('resize', () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        });
        
        // スクロール方向検出とヘッダー表示/非表示
        let lastScrollY = window.scrollY;
        const header = document.querySelector('.detail-header');
        const floatingCta = document.querySelector('.floating-cta');
        const mobileCta = document.querySelector('.mobile-cta');
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // スクロールダウン時はヘッダーを隠す
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                header.classList.add('header-hidden');
                if (floatingCta) floatingCta.style.bottom = '20px';
            } 
            // スクロールアップ時はヘッダーを表示
            else {
                header.classList.remove('header-hidden');
                if (floatingCta) floatingCta.style.bottom = '80px'; // モバイルCTAの上に表示
            }
            
            lastScrollY = currentScrollY;
        });
        
        // タブをタップした時のスクロール位置調整
        const tabLinks = document.querySelectorAll('.tab-nav a');
        if (tabLinks.length > 0) {
            tabLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        // スマホでのスクロール位置調整
                        const headerHeight = document.querySelector('.detail-header').offsetHeight;
                        const tabHeight = document.querySelector('.school-tab-section').offsetHeight;
                        const scrollPosition = targetElement.offsetTop - headerHeight - tabHeight - 10;
                        
                        window.scrollTo({
                            top: scrollPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }
        
        // タッチスライダーの挙動改善
        const voiceSlider = document.querySelector('.voice-slider');
        if (voiceSlider) {
            let startX, moveX;
            let currentSlide = 0;
            const slides = document.querySelectorAll('.voice-item');
            const maxSlides = slides.length - 1;
            
            // タッチスタート
            voiceSlider.addEventListener('touchstart', (e) => {
                startX = e.changedTouches[0].screenX;
            });
            
            // タッチ移動
            voiceSlider.addEventListener('touchmove', (e) => {
                moveX = e.changedTouches[0].screenX;
            });
            
            // タッチ終了
            voiceSlider.addEventListener('touchend', (e) => {
                if (startX - moveX > 50) { // 左スワイプ（次へ）
                    currentSlide = Math.min(currentSlide + 1, maxSlides);
                    showSlide(currentSlide);
                } else if (moveX - startX > 50) { // 右スワイプ（前へ）
                    currentSlide = Math.max(currentSlide - 1, 0);
                    showSlide(currentSlide);
                }
            });
        }
    }

    // ページ内全ての select をカスタムドロップダウン化
    (function() {
        const selects = document.querySelectorAll('select.time-select, select.option-select');
        selects.forEach(select => {
            if (select.closest('.custom-select-wrapper')) return;
            const wrapper = document.createElement('div');
            wrapper.className = 'custom-select-wrapper';
            select.parentNode.insertBefore(wrapper, select);
            wrapper.appendChild(select);
            select.style.display = 'none';
            const custom = document.createElement('div');
            custom.className = 'custom-select';
            const trigger = document.createElement('div');
            trigger.className = 'custom-select-trigger';
            trigger.textContent = select.options[select.selectedIndex]?.textContent || select.options[0].textContent;
            custom.appendChild(trigger);
            const optionsList = document.createElement('ul');
            optionsList.className = 'custom-options';
            Array.from(select.options).forEach(option => {
                const li = document.createElement('li');
                li.className = 'custom-option';
                li.dataset.value = option.value;
                li.textContent = option.textContent;
                optionsList.appendChild(li);
            });
            custom.appendChild(optionsList);
            wrapper.appendChild(custom);
        });

        document.querySelectorAll('.custom-select-wrapper').forEach(wrapper => {
            const select = wrapper.querySelector('select');
            const trigger = wrapper.querySelector('.custom-select-trigger');
            const optionsList = wrapper.querySelector('.custom-options');
            // 開閉
            trigger.addEventListener('click', e => {
                e.stopPropagation();
                wrapper.classList.toggle('open');
            });
            // 選択
            optionsList.querySelectorAll('.custom-option').forEach(option => {
                option.addEventListener('click', function(e) {
                    e.stopPropagation();
                    trigger.textContent = this.textContent;
                    select.value = this.dataset.value;
                    wrapper.classList.remove('open');
                    select.dispatchEvent(new Event('change'));
                });
            });
        });

        // 外部クリックで全ドロップダウン閉じる
        document.addEventListener('click', () => {
            document.querySelectorAll('.custom-select-wrapper.open').forEach(w => w.classList.remove('open'));
        });
    })();
}); 