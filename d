[1mdiff --git a/frontend/package-lock.json b/frontend/package-lock.json[m
[1mindex 04bd0f2..a27f8b8 100644[m
[1m--- a/frontend/package-lock.json[m
[1m+++ b/frontend/package-lock.json[m
[36m@@ -23,11 +23,15 @@[m
         "@types/react": "^18.2.56",[m
         "@types/react-dom": "^18.2.19",[m
         "@vitejs/plugin-react-swc": "^3.5.0",[m
[32m+[m[32m        "autoprefixer": "^10.4.18",[m
         "eslint": "^8.56.0",[m
         "eslint-plugin-react": "^7.33.2",[m
         "eslint-plugin-react-hooks": "^4.6.0",[m
         "eslint-plugin-react-refresh": "^0.4.5",[m
[31m-        "vite": "^5.1.4"[m
[32m+[m[32m        "postcss": "^8.4.35",[m
[32m+[m[32m        "react-router-dom": "^6.22.3",[m
[32m+[m[32m        "tailwindcss": "^3.4.1",[m
[32m+[m[32m        "vite": "^5.1.6"[m
       }[m
     },[m
     "node_modules/@aashutoshrathi/word-wrap": {[m
[36m@@ -39,6 +43,18 @@[m
         "node": ">=0.10.0"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/@alloc/quick-lru": {[m
[32m+[m[32m      "version": "5.2.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@alloc/quick-lru/-/quick-lru-5.2.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-UrcABB+4bUrFABwbluTIBErXwvbsU/V7TZWfmbgJfbkwiBuziS9gxdODUyuiecfdGQ85jglMW6juS3+z5TsKLw==",[m
[32m+[m[32m      "dev": true,[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=10"[m
[32m+[m[32m      },[m
[32m+[m[32m      "funding": {[m
[32m+[m[32m        "url": "https://github.com/sponsors/sindresorhus"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/@babel/code-frame": {[m
       "version": "7.23.5",[m
       "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.23.5.tgz",[m
[36m@@ -867,13 +883,55 @@[m
       "integrity": "sha512-6EwiSjwWYP7pTckG6I5eyFANjPhmPjUX9JRLUSfNPC7FX7zK9gyZAfUEaECL6ALTpGX5AjnBq3C9XmVWPitNpw==",[m
       "dev": true[m
     },[m
[32m+[m[32m    "node_modules/@isaacs/cliui": {[m
[32m+[m[32m      "version": "8.0.2",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@isaacs/cliui/-/cliui-8.0.2.tgz",[m
[32m+[m[32m      "integrity": "sha512-O8jcjabXaleOG9DQ0+ARXWZBTfnP4WNAqzuiJK7ll44AmxGKv/J2M4TPjxjY3znBCfvBXFzucm1twdyFybFqEA==",[m
[32m+[m[32m      "dev": true,[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "string-width": "^5.1.2",[m
[32m+[m[32m        "string-width-cjs": "npm:string-width@^4.2.0",[m
[32m+[m[32m        "strip-ansi": "^7.0.1",[m
[32m+[m[32m        "strip-ansi-cjs": "npm:strip-ansi@^6.0.1",[m
[32m+[m[32m        "wrap-ansi": "^8.1.0",[m
[32m+[m[32m        "wrap-ansi-cjs": "npm:wrap-ansi@^7.0.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=12"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@isaacs/cliui/node_modules/ansi-regex": {[m
[32m+[m[32m      "version": "6.0.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-6.0.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-n5M855fKb2SsfMIiFFoVrABHJC8QtHwVx+mHWP3QcEqBHYienj5dHSgjbxtC0WEZXYt4wcD6zrQElDPhFuZgfA==",[m
[32m+[m[32m      "dev": true,[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=12"[m
[32m+[m[32m      },[m
[32m+[m[32m      "funding": {[m
[32m+[m[32m        "url": "https://github.com/chalk/ansi-regex?sponsor=1"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@isaacs/cliui/node_modules/strip-ansi": {[m
[32m+[m[32m      "version": "7.1.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-7.1.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-iq6eVVI64nQQTRYq2KtEg2d2uU7LElhTJwsH4YzIHZshxlgZms/wIc4VoDQTlG/IvVIrBKG06CrZnp0qv7hkcQ==",[m
[32m+[m[32m      "dev": true,[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "ansi-regex": "^6.0.1"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=12"[m
[32m+[m[32m      },[m
[32m+[m[32m      "funding": {[m
[32m+[m[32m        "url": "https://github.com/chalk/strip-ansi?sponsor=1"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/@jridgewell/gen-mapping": {[m
       "version": "0.3.5",[m
       "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.5.tgz",[m
       "integrity": "sha512-IzL8ZoEDIBRWEzlCcRhOaCupYyN5gdIK+Q6fbFdPDg6HqX6jpkItn7DFIpW9LQzXG6Df9sA7+OKnq0qlz/GaQg==",[m
       "dev": true,[m
[31m-      "optional": true,[m
[31m-      "peer": true,[m
       "dependencies": {[m
         "@jridgewell/set-array": "^1.2.1",[m
         "@jridgewell/sourcemap-codec": "^1.4.10",[m
[36m@@ -888,8 +946,6 @@[m
       "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",[m
       "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",[m
       "dev": true,[m
[31m-      "optional": true,[m
[31m-      "peer": true,[m
       "engines": {[m
         "node": ">=6.0.0"[m
       }[m
[36m@@ -899,8 +955,6 @@[m
       "resolved": "https://registry.npmjs.org/@jridgewell/set-array/-/set-array-1.2.1.tgz",[m
       "integrity": "sha512-R8gLRTZeyp03ymzP/6Lil/28tGeGEzhx1q2k703KGWRAI1VdvPIXdG70VJc2pAMw3NA6JKL5hhFu1sJX0Mnn/A==",[m
       "dev": true,[m
[31m-      "optional": true,[m
[31m-      "peer": true,[m
       "engines": {[m
         "node": ">=6.0.0"[m
       }[m
[36m@@ -921,17 +975,13 @@[m
       "version": "1.4.15",[m
       "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.4.15.tgz",[m
       "integrity": "sha512-eF2rxCRulEKXHTRiDrDy6erMYWqNw4LPdQ8UQA4huuxaQsVeRPFl2oM8oDGxMFhJUWZf9McpLtJasDDZb/Bpeg==",[m
[31m-      "dev": true,[m
[31m-      "optional": true,[m
[31m-      "peer": true[m
[32m+[m[32m      "dev": true[m
     },[m
     "node_modules/@jridgewell/trace-mapping": {[m
       "version": "0.3.25",[m
       "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.25.tgz",[m
       "integrity": "sha512-vNk6aEwybGtawWmy/PzwnGDOjCkLWSD2wqvjGGAgOAwCGWySYXfYoxt00IJkTF+8Lb57DwOb3Aa0o9CApepiYQ==",[m
       "dev": true,[m
[31m-      "optional": true,[m
[31m-      "peer": true,[m
       "dependencies": {[m
         "@jridgewell/resolve-uri": "^3.1.0",[m
         "@jridgewell/sourcemap-codec": "^1.4.14"[m
[36m@@ -1217,6 +1267,16 @@[m
         "node": ">= 8"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/@pkgjs/parseargs": {[m
[32m+[m[32m      "version": "0.11.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@pkgjs/parseargs/-/parseargs-0.11.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-+1VkjdD0QBLPodGrJUeqarH8VAIvQODIbwh9XpP5Syisf7YoQgsJKPNFoqqLQlu+VQ/tVSshMR6loPMn8U+dPg==",[m
[32m+[m[32m      "dev": true,[m
[32m+[m[32m      "optional": true,[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=14"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/@popperjs/core": {[m
       "version": "2.11.8",[m
       "resolved": "https://registry.npmjs.org/@popperjs/core/-/core-2.11.8.tgz",[m
[36m@@ -1249,6 +1309,15 @@[m
         }[m
       }[m
     },[m
[32m+[m[32m    "node_modules/@remix-run/router": {[m
[32m+[m[32m      "version": "1.15.3",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@remix-run/router/-/router-1.15.3.tgz",[m
[32m+[m[32m      "integrity": "sha512-Oy8rmScVrVxWZVOpEF57ovlnhpZ8CCPlnIIumVcV9nFdiSIrus99+Lw78ekXyGvVDlIsFJbSfmSovJUhCWYV3w==",[m
[32m+[m[32m      "dev": true,[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=14.0.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/@rollup/rollup-android-arm-eabi": {[m
       "version": "4.12.1",[m
       "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm-eabi/-/rollup-android-arm-eabi-4.12.1.tgz",[m
[36m@@ -1771,6 +1840,31 @@[m
         "url": "https://github