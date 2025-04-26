<script lang="ts">
</script>

<div class="guide">
	<button>
		<span class="icon">
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M10.5 12H12V16H14M12 8H12.01M13.5628 20.8633C14.7268 20.658 15.8389 20.2256 16.8357 19.5905C17.8325 18.9555 18.6945 18.1303 19.3724 17.1622C20.0503 16.194 20.5309 15.1018 20.7867 13.948C21.0425 12.7941 21.0685 11.6011 20.8633 10.4372C20.658 9.27322 20.2256 8.1611 19.5905 7.1643C18.9555 6.1675 18.1303 5.30554 17.1622 4.62763C16.194 3.94972 15.1018 3.46914 13.948 3.21334C12.7941 2.95753 11.6011 2.9315 10.4372 3.13673C9.27322 3.34196 8.1611 3.77444 7.1643 4.40948C6.1675 5.04451 5.30554 5.86966 4.62763 6.83781C3.94972 7.80597 3.46914 8.89816 3.21334 10.052C2.95753 11.2059 2.9315 12.3989 3.13673 13.5628C3.34197 14.7268 3.77445 15.8389 4.40948 16.8357C5.04451 17.8325 5.86966 18.6945 6.83781 19.3724C7.80597 20.0503 8.89816 20.5309 10.052 20.7867C11.2059 21.0425 12.3989 21.0685 13.5628 20.8633Z"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</span>
		<span class="text">How do I switch to timer mode?</span>
	</button>

	<div class="guide-popover">
		<div class="guide-popover__content">
			<p>
				The default mode is Clock Mode.<br />To use Timer Mode, add a time parameter to the URL!
			</p>

			<code> flippix.com?timer=1:30 (1 minute 30 seconds timer)</code>
			<p>Use the format <code>timer=hour:minute:second</code>.</p>

			<blockquote>
				<ul>
					<li>25 → 25 seconds</li>
					<li>5:00 → 5 minutes</li>
					<li>1:30:00 → 1 hour 30 minutes</li>
				</ul>
			</blockquote>
		</div>
	</div>
</div>

<style lang="scss" scoped>
	.guide {
		width: 100%;
		padding: 20px 6rem 40px;

		button {
			position: relative;
			color: var(--basic-shallow);
			display: flex;
			align-items: center;
			gap: 4px;

			.icon {
				display: block;
				width: 20px;
				height: 20px;
				color: inherit;
				svg {
					width: 100%;
					height: 100%;
				}
			}

			.text {
				color: inherit;
				font-size: 16px;
			}

			&:hover {
				text-decoration: underline;
				color: var(--text-color);
			}

			&:hover + .guide-popover {
				display: block;
			}
		}

		&-popover {
			display: none;
			position: absolute;
			bottom: 100%;
			font-size: 16px;
			border-radius: 20px;
			padding: 16px;
			border-radius: 16px;
			background: var(--text-reverse-color);
			border: 2px solid var(--border-color);

			&::after {
				position: absolute;
				top: calc(100% - 4px);
				left: 40px;
				width: 0;
				height: 0;
				border-style: solid;
				border-width: 16px 10px 0px 10px;
				border-color: var(--text-reverse-color) transparent transparent transparent;
				box-sizing: border-box;
				filter: drop-shadow(0px 4px 0px var(--border-color));
				content: '';
			}

			&__content {
				p {
					line-height: 1.5;
					margin: 0.3em 0;
				}

				code {
					display: block;
					padding: 0.4em;
					font-size: 0.9em;
					font-family: monospace;
					border-radius: 4px;
					color: var(--basic-shallow);
					background-color: var(--surface-background);
				}
				p > code {
					display: inline;
					padding: 0.2em 0.4em;
				}

				blockquote {
					margin: 0;
					padding: 0.2em 0.5em 0.2em 0.8em;
					border-left: 3px solid var(--basic-shallow);
					color: var(--basic-shallow);

					ul li {
						font-family: monospace;
					}
				}
			}
		}
	}
</style>
