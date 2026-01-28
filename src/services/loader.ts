class LoaderService {
	private loading: boolean = false;
	private loader: HTMLDivElement;

	constructor() {
		this.loader = document.getElementById("loader") as HTMLDivElement;
	}

	isLoading(): boolean {
		return this.loading;
	}

	startLoader(): void {
		if (this.loading) return;
		this.loading = true;
		if (
			!this.loader.classList.contains("load-active") &&
			!this.loader.classList.contains("load-animate")
		) {
			this.loader.classList.add("load-active");
			this.loader.classList.add("load-animate");
		}
	}

	stopLoader(): void {
		if (!this.loading) return;
		setTimeout(() => {
			if (this.loader.classList.contains("load-active")) {
				this.loader.classList.remove("load-active");
			}
		}, 500);
		setTimeout(() => {
			if (this.loader.classList.contains("load-animate")) {
				this.loader.classList.remove("load-animate");
			}
		}, 2000);
		this.loading = false;
	}
}
