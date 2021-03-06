/*
 (c) Higehito Higeyama , since 2016
*/
var mkt = {
	ini: function() {
		mkt.observe.ini()
	},
	logData: [],
	log: function(a) {
		this.logData.push(a)
	},
	ver: function() {
		return "script-version:0515-xxxx"
	},
	pop: {
		popElm: null,
		ini: function() {
			mkt.pop.popElm = document.getElementById("pop");
			mkt.pop.popElm ? ((new MutationObserver(this.callObserver)).observe(mkt.pop.popElm, {
				childList: !0,
				subtree: !0
			}), mkt.log("mkt.pop.ini\u3067\u76e3\u8996\u51e6\u7406\u3092\u4ed8\u4e0e\u3057\u307e\u3057\u305f")) : mkt.log("mkt.pop.ini\u3010\u00d7\u3011#pop\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093\u3067\u3057\u305f")
		},
		callObserver: function(a, b) {
			var c = mkt.pop.popElm.querySelector(".prt-popup-header");
			c && ("Twitter\u6295\u7a3f" == c.textContent ? mkt.pop.twitter() : "\u6551\u63f4\u4f9d\u983c" == c.textContent && mkt.pop.multihelp(), -1 != location.href.indexOf("#raid_multi/") && (c = mkt.pop.popElm.querySelector("div"))) && (c.style.top = "50px")
		},
		twitter: function() {
			var a = mkt.pop.popElm.querySelector(".txt-twitter-name"),
				b = mkt.pop.popElm.querySelector(".txt-attention-comment");
			if (a && b)
				if (-1 != b.textContent.indexOf("\u53c2\u52a0\u8005\u52df\u96c6\uff01\u53c2\u6226")) mkt.log("\u6551\u63f4\u4f9d\u983c\u3068\u5224\u65ad");
				else if (a = a.textContent.match(/[0-9a-zA-Z_]{1,20}/), 0 < a.length && (b = mkt.pop.popElm.querySelector("textarea#frm-post-tweet"))) b.textContent = "d @" + a[0]
		},
		multihelp: function() {
			var a = this.popElm.querySelector(".prt-battle-id");
			a && (a.style.webkitUserSelect = "auto")
		}
	}
};
mkt.observe = {
	loadElm: document.querySelector("#loading > .img-load"),
	ini: function() {
		mkt.observe.loadElm ? (new MutationObserver(this.elmObserver)).observe(this.loadElm, {
			attributes: !0,
			attributeFilter: ["style"],
			attributeOldValue: !0
		}) : mkt.log("\u00d7:img-load\u8981\u7d20\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093\u3067\u3057\u305f")
	},
	elmObserver: function(a, b) {
		-1 != a[0].target.style.display.indexOf("none") && (mkt.log("\u8981\u7d20.img-load\u306e\u975e\u8868\u793a\u3092\u691c\u77e5"), mkt.observe.router())
	},
	router: function() {
		mkt.pop.ini(); - 1 != location.hash.indexOf("#raid") ? mkt.hpInfo.ini() : -1 != location.hash.indexOf("#party") ? (mkt.weapon.getPartyIndexWeaponData(), -1 != location.href.indexOf("#party/list_") && mkt.sort.ini()) : -1 == location.hash.indexOf("#enhancement") && -1 == location.hash.indexOf("#list") && -1 == location.hash.indexOf("#evolution") || mkt.sort.ini()
	}
};
try {
	mkt.ini()
} catch (a) {
	mkt.log(a)
}
mkt.hpInfo = {
	timerID: null,
	ini: function() {
		this.maskHide();
		if (document.querySelector(".mkt_raidstatus")) mkt.log(".mkt_raidstatus \u304c\u3042\u308b\u306e\u3067\u4f55\u3082\u3057\u307e\u305b\u3093");
		else {
			mkt.log("\u25b3mkt_raidstatus\u304c\u898b\u3064\u304b\u3089\u306a\u304b\u3063\u305f\u306e\u3067\u8981\u7d20\u306e\u4f5c\u6210\u3068\u914d\u7f6e\u3092\u8a66\u884c");
			mkt.hpInfo.createHpInfoElm();
			var a = document.querySelector(".cnt-multi") || document.querySelector(".prt-command");
			a ? ("prt-command" == a.className &&
				(a.style.height = "220px"), a.appendChild(mkt.hpInfo.hpElmParent)) : mkt.log("\u00d7:\u89aa\u306e\u914d\u7f6e\u306b\u5931\u6557")
		}
		mkt.log("mkt.hpInfo.callTimer\u3092\u958b\u59cb");
		mkt.hpInfo.timerID && clearTimeout(mkt.hpInfo.timerID);
		mkt.hpInfo.timerID = setTimeout(function() {
			mkt.hpInfo.callTimer()
		}, 1E3)
	},
	callTimer: function() {
		-1 != location.href.indexOf("#raid") ? (window.Game.view.setupView && window.Game.view.setupView.pJsnData && window.Game.view.setupView.pJsnData.boss.param && mkt.hpInfo.setupViewObserve(window.Game.view.setupView.pJsnData),
			mkt.hpInfo.timerID && clearTimeout(mkt.hpInfo.timerID), mkt.hpInfo.timerID = setTimeout(function() {
				mkt.hpInfo.callTimer()
			}, 1E3)) : mkt.log("location\u306b#raid\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093")
	},
	setupViewObserve: function(a) {
		var b = {
			bosshp: {},
			bosscondition: {}
		};
		if (a.boss.param)
			for (var c = 0; c < a.boss.param.length; c++) b.bosshp[c] = {
				hp: a.boss.param[c].hp,
				mhp: a.boss.param[c].hpmax,
				name: a.boss.param[c].name
			}, mkt.hpInfo.writeScriptData(b, c), b.bosscondition[c] = a.boss.param[c].condition;
		else mkt.log("pJson.boss.param\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093")
	},
	writeScriptData: function(a, b) {
		var c = (a.bosshp[b].hp / a.bosshp[b].mhp * 100).toFixed(2);
		mkt.hpInfo.hpElmArr[b].name.textContent = a.bosshp[b].name;
		mkt.hpInfo.hpElmArr[b].hp.textContent = a.bosshp[b].hp + "/" + a.bosshp[b].mhp;
		mkt.hpInfo.hpElmArr[b].per.textContent = c + "%"
	},
	hpElmArr: [],
	hpElmParent: null,
	createHpInfoElm: function() {
		this.hpElmParent = document.createElement("div");
		mkt.log("HP\u60c5\u5831\u683c\u7d0d\u8981\u7d20\u306e\u4f5c\u6210\u3092\u958b\u59cb");
		this.hpElmParent.className = "mkt_raidstatus";
		this.hpElmParent.style.display =
			"inline-table";
		this.hpElmParent.style.width = "100%";
		for (var a = 0; 3 > a; a++) {
			var b = document.createElement("div");
			b.style.display = "table-row";
			var c = document.createElement("div"),
				d = document.createElement("div"),
				e = document.createElement("div");
			c.style.display = "table-cell";
			d.style.display = "table-cell";
			e.style.display = "table-cell";
			b.appendChild(d);
			b.appendChild(c);
			b.appendChild(e);
			mkt.hpInfo.hpElmParent.appendChild(b);
			mkt.hpInfo.hpElmArr[a] = {
				name: d,
				hp: c,
				per: e
			}
		}
	},
	maskHide: function() {
		var a = document.getElementById("multi-btn-mask");
		a && (mkt.log("\u9ad8\u3055\u3092\u4fee\u6b63\u3057\u307e\u3057\u305f"), a.style.height = "0px")
	}
};
mkt.weapon = {
	getPartyIndexWeaponData: function() {
		if (window.Game.view.deck_model) {
			var a = window.Game.view.deck_model.attributes.deck.pc.weapons,
				b = document.querySelectorAll("div[class^='btn-weapon']"),
				c;
			for (c in a)
				if (a[c].param && a[c].param.skill_level) {
					var d = document.createElement("div");
					d.className = "mkt_pt_weapon_skilllevelnum";
					d.textContent = a[c].param.skill_level;
					b[c - 1].appendChild(d);
					d = document.createElement("div");
					d.className = "mkt_pt_weapon_levelnum";
					d.textContent = a[c].param.level;
					b[c - 1].appendChild(d)
				}
		} else mkt.log("deck_model\u30aa\u30d6\u30b8\u30a7\u30af\u30c8\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093")
	}
};
mkt.sort = {
	setElm: document.createElement("div"),
	createdOkBtnFlag: !1,
	ini: function() {
		var a = ""; - 1 != location.href.indexOf("/#list") ? a = ".prt-listup" : -1 != location.href.indexOf("#party/list") ? a = ".cnt-order-box" : -1 != location.href.indexOf("#enhancement/") ? a = "[class^='prt-module-']" : -1 != location.href.indexOf("#evolution/") && (a = "[class^='prt-module-']");
		if (!document.querySelector(".mkt_list_sort_bar")) {
			if ((a = document.querySelectorAll(a)) && 0 < a.length) {
				this.createdFlag = !0;
				for (var b = 0; b < a.length; b++) a[b].insertBefore(this.cElm(),
					a[b].firstChild)
			} else mkt.log("404 cnt-select"), document.querySelectorAll(".cnt-select");
			this.setDummyElm()
		}
	},
	cElm: function() {
		var a = "\u5168\u706b\u6c34\u571f\u98a8\u5149\u95c7".split(""),
			b = document.createElement("div");
		b.className = "mkt_list_sort_bar";
		b.style.position = "absolute";
		b.style.top = "-2px";
		b.style.left = "150px";
		b.style.color = "white";
		for (var c = 0; c < a.length; c++) {
			var d = document.createElement("img");
			d.src = "http://gbf.game-a.mbga.jp/assets/img/sp/deckcombination/parts/icon/icon_type_1_" + (0 == c ? 7 :
				c) + ".png";
			d.style.width = "18px";
			d.style.display = "inline-block";
			d.dataset.attr = c;
			d.addEventListener("click", function(a) {
				mkt.sort.elementClickHndl(a)
			}, !1);
			b.appendChild(d)
		}
		return b
	},
	elementClickHndl: function(a) {
		if (mkt.sort.dummyUsualOkElm) {
			if ((a = a.target.dataset.attr) && window.Game.view.sortFilterData.filter) {
				var b = window.Game.view.sortFilterData.filter,
					c;
				for (c in b)
					if (6 == b[c].length) {
						var d = "000000".split("");
						d[a - 1] = "1";
						b[c] = d.join("");
						break
					}
			}
			c = document.createEvent("UIEvent");
			c.initUIEvent("tap", !0, !1);
			mkt.sort.dummyUsualOkElm.dispatchEvent(c)
		}
	},
	dummyUsualOkElm: null,
	dummySelectCompleteElm: null,
	setDummyElm: function() {
		if (!document.getElementById("mkt_dummy_ok_btn")) {
			var a = document.querySelector(".contents");
			if (a) {
				var b = document.createElement("div");
				this.dummyUsualOkElm = document.createElement("div");
				b.id = "mkt_dummy_ok_btn";
				b.classList.add("pop-set-sort-filter");
				b.style.display = "none";
				this.dummyUsualOkElm.className = "btn-usual-ok";
				b.appendChild(this.dummyUsualOkElm);
				a.appendChild(this.setDummySelectCompleteElm());
				a.appendChild(b)
			} else mkt.log("_contentsElm\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093")
		}
	},
	setDummySelectCompleteElm: function() {
		var a = document.createElement("div");
		this.dummySelectCompleteElm = document.createElement("div");
		a.id = "mkt_dummy_complete_btn";
		a.classList.add("pop-filter-enhancement");
		a.style.display = "none";
		this.dummySelectCompleteElm.className = "btn-usual-ok";
		a.appendChild(this.dummySelectCompleteElm);
		return a
	}
};
