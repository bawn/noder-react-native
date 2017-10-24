//
//  NSMutableAttributedString+HQLineSpace.h
//  Mark
//
//  Created by bawn on 12/11/15.
//  Copyright © 2015 huoqiu. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface NSMutableAttributedString (LCLineSpace)


+ (NSAttributedString *)attributedWithPString:(NSString *)string;

+ (NSAttributedString *)attributedWithH1String:(NSString *)string;
+ (NSAttributedString *)attributedWithH2String:(NSString *)string;
+ (NSAttributedString *)attributedWithH3String:(NSString *)string;

+ (NSAttributedString *)attributedWithLiString:(NSString *)liString
                                  aStringArray:(NSArray *)aStringArray
                                     hrefArray:(NSArray *)hrefArray;

+ (NSAttributedString *)attributedWithPString:(NSString *)pString
                                 aStringArray:(NSArray<NSString *> *)aStringArray
                                    hrefArray:(NSArray *)hrefArray;

+ (NSAttributedString *)aContentAttributedWithString:(NSString *)string;

@end
