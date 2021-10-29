import logging as log
import sys
log.basicConfig(stream=sys.stdout, level=log.DEBUG)
from playwright.sync_api import Playwright, sync_playwright

def run(playwright, to, dest):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    # Open new page
    page = context.new_page()
    page.goto("https://maps.charlotte.edu/")
    page.click("text=From To Go! >> input[type=\"text\"]")
    page.fill("text=From To Go! >> input[type=\"text\"]", to +", Charlotte, NC, USA")
    page.click("text=9006 Craver Rd >> span")
    page.click("text=To Go! >> input[type=\"text\"]")
    page.fill("text=To Go! >> input[type=\"text\"]", dest + ", Charlotte, NC, USA")
    page.click("text=9105 University Rd >> span")
    page.click("css=[title='Walking']")
    page.click("text=Go!")
    page.wait_for_timeout(600)
    summary_handle_1 = page.query_selector("div.adp-summary > span:nth-child(1)").text_content()
    summary_handle_2 = page.query_selector("div.adp-summary > span:nth-child(2)").text_content()
    summary_handle_3 = page.query_selector("div.adp-summary > span:nth-child(3)").text_content()
    trip_summary = summary_handle_1 + summary_handle_2 + summary_handle_3
    page.click("text=Map")
    page.click("text=Dark Mode")
    page.click("text=Dark Mode")
    page.click(".collapse-chevron")
    canvas_handle = page.query_selector("#map-canvas")
    bounding_box = canvas_handle.bounding_box()
    img = canvas_handle.screenshot(path="screenshot.png")
    context.close()
    browser.close()
    return trip_summary, img
with sync_playwright() as playwright:
    summary, img = run(playwright,"9006 Craver Rd","9105 University Rd")
    log.info(summary)